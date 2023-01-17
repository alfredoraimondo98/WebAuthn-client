const algosdk = require('algosdk');
const Wallet = require('@lorena-ssi/wallet-lib').default
const base64url = require('base64url');
const { countReset } = require('console');
const fs = require('fs')
const crypto = require('crypto')
const server="https://testnet-algorand.api.purestake.io/ps2";
const port="";
const token={
    "x-api-key": "cFytdDh7ETMLwFujzahn1V7710kbJFL5ZPIZhOMj" 
};

const baseServerIndexer = "https://testnet-algorand.api.purestake.io/idx2";


const client = new algosdk.Algodv2(token, server, port);
const indexer = new algosdk.Indexer(token, baseServerIndexer, port);
const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16; // For AES, this is always 16
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
    console.log("object ", object)
    let myAccount = await getAlgorandAccount(username, userID);

      // Test IPFS
      const { create } = await import('ipfs-core');
      let ipfs = await create()
      const version = await ipfs.version();
      console.log("Ipfs version : ", version.version)

      let path = "C:/Users/alfre/Desktop/test.txt";
      let cont = fs.readFileSync('C:/Users/alfre/Desktop/test.txt', {encoding: 'base64'});

    let encryptionPassword = undefined
    encryptionPassword =  crypto.createHash('sha256').update(String(encryptionPassword)).digest('base64').substr(0, 32)
    crypto.createSecretKey()
    cont = _encryptBuffer(cont, encryptionPassword)
    console.log("cont encrypted ", cont)


    cont = Buffer.from(cont)
      

    let obj = {
        pathname : path,
        content : cont
    }
      const cid = await ipfs.add(obj)
       
      console.log('cid ', cid)

 
     
    

    let params = await client.getTransactionParams().do();
    // comment out the next two lines to use suggested fee
    // params.fee = 1000;
    // params.flatFee = true;
    let str = "Ciao Mondo"
    const noteContents = {
        cid: cid.path,
        path: path
    }
    console.log("note contents ", noteContents)
    let note = algosdk.encodeObj(noteContents)
   
    
    //let note =  Uint8Array.from(str.split("").map(x => x.charCodeAt())) //Uint8Array.from('object'); // arbitrary data to be stored in the transaction; here, none is stored
    console.log("note ", note)
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

    //console.log("info account assets", infoAccount.assets)
    
    let assets = infoAccount.assets

    var promiseArray = new Array()

    assets.forEach( async asset => {
        let p = new Promise(async (resolve, reject) => {
           // console.log("asset ", asset)
            let assetDetails = await client.accountAssetInformation(myAccount.addr, asset['asset-id']).do()
            resolve(assetDetails)
        })
        promiseArray.push(p)
    });

    //console.log("transaction of assets ", await indexer.lookupAssetTransactions('154358615').do())
    let r =  await indexer.lookupTransactionByID('ML2KI4ZSZMXAKSNJWF7ENFZSMHUIJJDBAS4PAR6P3V4KJY2KOXGA').do() 
    console.log("r.transaction.note ", r.transaction.note)
     const noteBase64 = Buffer.from(r.transaction.note, 'base64')
    const note = algosdk.decodeObj(noteBase64)
   
    //console.log("transaction ", r)
    

    console.log("CID ", note.cid)

    
    const { create } = await import('ipfs-core');



    let ipfs = await create()
    const version = await ipfs.version();
    console.log("Ipfs version : ", version.version)

    const chunks = []
    for await (const chunk of ipfs.cat((note.cid))) {
      chunks.push(chunk)
    }
    let fileContents = Buffer.concat(chunks)

    console.log('File contents retrieved with buffer length:', fileContents.length)

    let encryptionPassword = undefined
    encryptionPassword =  crypto.createHash('sha256').update(String(encryptionPassword)).digest('base64').substr(0, 32)
    console.log("encryption Password", encryptionPassword)
    fileContents = _decryptBuffer(fileContents, encryptionPassword)
    console.log("cont decrypted ", fileContents)

    fs.writeFileSync(`C:/Users/alfre/Desktop/test2.txt`, base64url.decode(fileContents))


    

   // let noteDecoded = algosdk.decodeObj(note)
    //console.log("note decoded ", noteDecoded)
    /*
    let cid = note.cid

    const { create } = await import('ipfs-core');
    let ipfs = await create()
    const version = await ipfs.version();
    console.log("Ipfs version : ", version.version)

    const stream = await ipfs.cat(cid)
    console.log(" stream ", stream)


    const decoder = new TextDecoder()
    let data = ''

    for await (const chunk of stream) {
    // chunks of data are returned as a Uint8Array, convert it back to a string
        data += decoder.decode(chunk, { stream: true })
    }

*/
    // Test IPFS
    /*
    const { create } = await import('ipfs-core');
    let ipfs = await create()
    const version = await ipfs.version();
    console.log("Ipfs version : ", version.version)
    /*
        let assetid = '154328835'
        // note: if you have an indexer instance available it is easier to just search accounts for an asset
        let accountInfo = await client.accountInformation(myAccount.addr).do();
        for (idx = 0; idx < accountInfo['assets'].length; idx++) {
            let scrutinizedAsset = accountInfo['assets'][idx];
            if (scrutinizedAsset['asset-id'] == assetid) {
                let myassetholding = JSON.stringify(scrutinizedAsset, undefined, 2);
                console.log("assetholdinginfo = " + myassetholding);
                break;
            }
        }


        for (idx = 0; idx < accountInfo['created-assets'].length; idx++) {
            let scrutinizedAsset = accountInfo['created-assets'][idx];
            if (scrutinizedAsset['index'] == assetid) {
                console.log("AssetID = " + scrutinizedAsset['index']);
                let myparms = JSON.stringify(scrutinizedAsset['params'], undefined, 2);
                console.log("parms = " + myparms);
                break;
            }
        }
    
    */
   let result = {
    obj : 'ok'
   }
    res.send(result)

    /*
    Promise.all(promiseArray).then( (assets) => {
        //console.log("asset", assets)

        res.send(assets)
    })   
    */
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




function _encryptBuffer(buffer, encryptionPassword) {
    console.log('Running encryption on file before uploading')
    let iv = crypto.randomBytes(IV_LENGTH)
    let cipher = crypto.createCipheriv(ALGORITHM, encryptionPassword, iv)
    let encrypted = Buffer.concat([cipher.update(buffer), cipher.final()])
    return Buffer.from(iv.toString('hex') + ':' + encrypted.toString('hex'))
  }

function _decryptBuffer(buffer, encryptionPassword) {
    console.log('Running decryption on downloaded file')
    let textParts = String(buffer).split(':')
    let iv = Buffer.from(textParts.shift(), 'hex')
    let encryptedText = Buffer.from(textParts.join(':'), 'hex')
    let decipher = crypto.createDecipheriv(ALGORITHM, encryptionPassword, iv)
    let decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()])
    return decrypted
  }