const algosdk = require('algosdk');
const Wallet = require('@lorena-ssi/wallet-lib').default
const base64url = require('base64url');


const server="https://testnet-algorand.api.purestake.io/ps2";
const port="";
const token={
    "x-api-key": "cFytdDh7ETMLwFujzahn1V7710kbJFL5ZPIZhOMj" 
};

const client = new algosdk.Algodv2(token, server, port);

/**
 * Crea un asset
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.createAsset = async (req, res, next) => {
    let username = req.body.username;
    let userID = req.body.userID;

    let object = {
        username : username
    }
    let myAccount = await getAlgorandAccount(username, userID);

    let params = await client.getTransactionParams().do();
    // comment out the next two lines to use suggested fee
    // params.fee = 1000;
    // params.flatFee = true;
    let note = Uint8Array.from(Object.values(object)); // arbitrary data to be stored in the transaction; here, none is stored
    // Asset creation specific parameters
    // The following parameters are asset specific
    // Throughout the example these will be re-used. 
    // We will also change the manager later in the example
    let addr = myAccount.addr;
    // Whether user accounts will need to be unfrozen before transacting    
    let defaultFrozen = false;
    // integer number of decimals for asset unit calculation
    let decimals = 0;
    // total number of this asset available for circulation   
    let totalIssuance = 1000;
    // Used to display asset units to user    
    let unitName = "MY NAME";
    // Friendly name of the asset    
    let assetName = "My Name";
    // Optional string pointing to a URL relating to the asset
    let assetURL = "";
    // Optional hash commitment of some sort relating to the asset. 32 character length.
    let assetMetadataHash = "16efaa3924a6fd9d3a4824799a4ac65d";
    // The following parameters are the only ones
    // that can be changed, and they have to be changed
    // by the current manager
    // Specified address can change reserve, freeze, clawback, and manager
    let manager = myAccount.addr;
    // Specified address is considered the asset reserve
    // (it has no special privileges, this is only informational)
    let reserve = myAccount.addr;
    // Specified address can freeze or unfreeze user asset holdings 
    let freeze = myAccount.addr;
    // Specified address can revoke user asset holdings and send 
    // them to other addresses    
    let clawback = myAccount.addr;

    // signing and sending "txn" allows "addr" to create an asset
    let txn = algosdk.makeAssetCreateTxnWithSuggestedParams(
        addr, 
        note,
        totalIssuance, 
        decimals, 
        defaultFrozen, 
        manager, 
        reserve, 
        freeze,
        clawback, 
        unitName, 
        assetName, 
        assetURL, 
        assetMetadataHash, 
        params);

    let rawSignedTxn = txn.signTxn(Uint8Array.from(Object.values(myAccount.sk)))
    let tx = (await client.sendRawTransaction(rawSignedTxn).do());

    let assetID = null;
    // wait for transaction to be confirmed
    const ptx = await algosdk.waitForConfirmation(client, tx.txId, 4);
    // Get the new asset's information from the creator account
    assetID = ptx["asset-index"];
    //Get the completed Transaction
    console.log("Transaction " + tx.txId + " confirmed in round " + ptx["confirmed-round"]);

    let result = {
        assetID : assetID
    }

    res.send(result)
}


exports.getMyAssets = async (req, res, next) => {
    let username = req.body.username;
    let userID = req.body.userID;

    let myAccount = await getAlgorandAccount(username, userID);

    let infoAccount = await client.accountInformation(myAccount.addr).do()

    console.log("info account assets", infoAccount.assets)
    
    let assets = infoAccount.assets

    var promiseArray = new Array()

    assets.forEach( async asset => {
        let p = new Promise(async (resolve, reject) => {
            console.log("asset ", asset)
            let assetDetails = await client.accountAssetInformation(myAccount.addr, asset['asset-id']).do()
            resolve(assetDetails)
        })
        promiseArray.push(p)
    });
   

    Promise.all(promiseArray).then( (assets) => {
        console.log("asset", assets)

        res.send(assets)
    })   

}

/**
 * recupera le credenziali Algorand dell'account
 * @param {*} username 
 * @param {*} userID 
 * @returns 
 */
async function getAlgorandAccount(username, userID){
    const options = {
        storage: 'fs', // default in the filesystem; 'mem' for in-memory
        silent: true // default silences Zenroom debugging messages
    }


    let pass = generatePassword(username, userID)


    const myWalletRetrieved = new Wallet(username, options)
    result = await myWalletRetrieved.unlock(pass)
    console.log("result ", result)
    if(result){
        console.log(" myWalletRetrieved" , myWalletRetrieved)
    }

    let account = myWalletRetrieved.info.keyPair

    console.log("my account ", account)

    return account
    
}

/**
 * Prende in input username, credential ID
 */
 function generatePassword(username, userID){
   
    let result = username.concat("-", userID);

    console.log("pass generate ", result)

    let result64 = base64url.encode(result)

    console.log("pass encoded ", result64)


    return result64
   
}