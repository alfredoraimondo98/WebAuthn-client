const algosdk = require('algosdk');
const Wallet = require('@lorena-ssi/wallet-lib').default

exports.getAccount = async (req, res, next) => {
    
    console.log("login wallet ")
    let username = req.body.username 

    const options = {
        storage: 'fs', // default in the filesystem; 'mem' for in-memory
        silent: true // default silences Zenroom debugging messages
    }

    const myWalletRetrieved = new Wallet(username, options)
    result = await myWalletRetrieved.unlock('password')
    if(result){
        console.log(" myWalletRetrieved" , myWalletRetrieved)
    }

    let account = myWalletRetrieved.info.keyPair

    console.log("my account ", account)
    

    const server="https://testnet-algorand.api.purestake.io/ps2";
    const port="";
    const token={
        "x-api-key": "cFytdDh7ETMLwFujzahn1V7710kbJFL5ZPIZhOMj" 
    };

    let client = new algosdk.Algodv2(token, server, port);
    let infoClient =  await client.accountInformation(account.addr).do();

    console.log("account info ", infoClient)

    account.amount = infoClient.amount
    account.addr = infoClient.address
    account.username = username
    
    res.send(account);


}


/**
 * create new algorand credential and store it into wallet on fs client
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.createWallet = async (req, res, next) => {
    console.log("create wallet ")
    let username = req.body.username 
   
    console.log("username ", username)

    let account = await algosdk.generateAccount()

    console.log("account ", account.sk)

    

    let mnemonic = await algosdk.secretKeyToMnemonic(account.sk)
    console.log("mnemonic sk ", mnemonic)


     
    const options = {
        storage: 'fs', // 'fs' default in the filesystem; 'mem' for in-memory
        silent: true // default silences Zenroom debugging messages
    }
    
    // create your instance of the wallet with the username supplied
    const myWallet = new Wallet(username, options) 
    console.log("my wallet ", myWallet)

    // attempt to unlock an existing wallet (since it is in-memory, this will be `false`)
    let result = await myWallet.unlock('password')
    console.log("result unlock ", result)

    // this is a new wallet, so `unlock` returned `false`.
    if(result == false){
        console.log("false")
    }

    myWallet.pubKey = 'public key webauthN'
    myWallet.info.myData = 'this is my sensitive data'
    myWallet.info.myMnemonic = mnemonic
    myWallet.info.keyPair = account

    // write changes to disk (encrypted: you need to supply the password)
    result = await myWallet.lock('password')
    console.log("result lock ", result)


    console.log("my wallet writed ", myWallet)

    let response = {
        myWallet : myWallet,
        bool : true
    }
    res.send(response)
}