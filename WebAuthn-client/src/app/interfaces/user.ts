import { myAssets } from "./myAsset";

export interface User {
    username ?: string,
    userID ?: string,
    credentialId ?: string,
    addr ?: string,
    amount ?: number ,
    checkCredentialBool ? : boolean,
    myAssets ?: Array<myAssets>
}