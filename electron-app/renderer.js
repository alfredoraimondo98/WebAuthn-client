// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const Wallet = require('@lorena-ssi/wallet-lib').default

exports.wallet = async function createWallet(){
    const options = {
        storage: 'fs', // 'fs' default in the filesystem; 'mem' for in-memory
        silent: true // default silences Zenroom debugging messages
      }
    
      // create your instance of the wallet with the username supplied
      const myWallet = new Wallet('testOK2', options) 
      console.log("wallet ", myWallet)
      let result = await myWallet.unlock('password')
      console.log("result unlock ", result)
    
      // this is a new wallet, so `unlock` returned `false`.
      if(result == false){
          console.log("false")
      }
    
      myWallet.pubKey = 'public key webauthN'
      myWallet.info.myData = 'this is my sensitive data'
    
      // write changes to disk (encrypted: you need to supply the password)
      result = await myWallet.lock('password')
      console.log("result lock ", result)
}