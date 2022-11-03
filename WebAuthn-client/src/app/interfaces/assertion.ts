export interface Assertion {
    authenticatorData : ArrayBuffer,
    clientDataJSON ? : ArrayBuffer,
    signature  : ArrayBuffer,
    userHandle ? : ArrayBuffer
}

