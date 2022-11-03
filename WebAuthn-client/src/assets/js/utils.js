
function strToArrayBuffer(str){
    return Uint8Array.from(str, c => c.charCodeAt(0))

}

function decodeCBOR(attestationObject){

    return cbor.decodeAllSync(attestationObject)
}