
async function loadPKCS11() {
    alert("ciao")
    console.log("ok")
    //var pkcs11js = require("pkcs11js");
    const pkcs11js = import('../../../node_modules/pkcs11js')
    pkcs11js.then( (res) => {
        console.log("res ", res)
    })
    console.log("imported")
    

    var pkcs11 = new pkcs11js.PKCS11();
    pkcs11.load("C:/Program Files/OpenSC Project/OpenSC/pkcs11/opensc-pkcs11.dll")
    pkcs11.C_Initialize()
    
    
    
    var graphene = require ("graphene-pk11");
    alert("imported")
    var Module = graphene.Module;
    
    var mod = Module.load("C:/Program Files/OpenSC Project/OpenSC/pkcs11/opensc-pkcs11.dll", "OpenSC");

    mod.initialize();

    var slots = mod.getSlots();

    console.log("slots ", slots)
    return 0

}
   
function arrayBufferToString(buffer){
    var arr = new Uint8Array(buffer);
    var str = String.fromCharCode.apply(String, arr);
    if(/[\u0080-\uffff]/.test(str)){
        throw new Error("this string seems to contain (still encoded) multibytes");
    }
    return str;
}
 
function strToArrayBuffer(str){
    return Uint8Array.from(str, c => c.charCodeAt(0))
}
