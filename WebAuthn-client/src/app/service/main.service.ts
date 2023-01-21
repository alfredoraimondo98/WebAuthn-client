import { Injectable } from '@angular/core';
import { Asset } from 'algosdk/dist/types/src/client/v2/algod/models/types';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  urlServer : string = 'http://localhost:3000'
  urlLocalServer : string = 'http://localhost:9990'
  user : User
  data : string = ''

  constructor() { 
    this.user = {
      username : '',
      userID : '',
      credentialId : '',
      addr : '',
      amount : 0 ,
      checkCredentialBool : false,
      myAssets : []
    }
  }
}