
async function createAlgorandAccount(){
    
    const algosdk = import('algosdk')
        
    return algosdk.generateAcconunt()
    


}

async function initAlgosdk() {
    return algosdk;
}