import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Assertion } from 'src/app/interfaces/assertion';
import { MainService } from 'src/app/service/main.service';
import { encode, decode } from 'base64-arraybuffer'
import { User } from 'src/app/interfaces/user';
import { myAssets } from 'src/app/interfaces/myAsset';

declare function strToArrayBuffer(str: String) : ArrayBuffer;

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  myAssetsArray : Array<myAssets> = []
  numberOfAssets : any = 0
  dataViewAsset : string = ''

  constructor(private router : Router, private http : HttpClient, public mainService : MainService) { 
  }

  ngOnInit(): void {
    console.log("addr ", this.mainService.user.addr)
    console.log("this.user", this.mainService.user)
    this.checkCredential()
    this.retrieveMyAssets();
    //this.getMyTransaction()
  }

  checkCredential(){
    if(this.mainService.user.checkCredentialBool){
      document.getElementById('checkCredentialButton')?.click()
    }
  }

  popupUploadData(){
    document.getElementById('uploadDataButton')?.click()
  }

  popupUploadDoc(){
    document.getElementById('uploadDocButton')?.click()
  }

  popupUploadImg(){
    document.getElementById('uploadImagesButton')?.click()
  }
 


  getMyTransaction(){
    let body = {
      address : this.mainService.user.addr
    }

    this.http.post(this.mainService.urlLocalServer+'/account/getMyTransaction', body).subscribe( async (response : any) => {
      console.log("respopnse ", response)
    });
  }
  
  createTransaction(form : NgForm){
    
    let body = {
      username : this.mainService.user.username,
    }
    
    //var account =  createAlgorandAccount();

    //console.log("account ", account)

    this.http.post(this.mainService.urlServer+'/actions/get_transaction_options', body).subscribe( async (response : any) => {

  
      console.log("response ", response)

      console.log("getLoginOptions response ", <PublicKeyCredentialRequestOptions> response)

        
      response.publicKeyCredentialRequestOptions.challenge = strToArrayBuffer(response.publicKeyCredentialRequestOptions.challenge) ;//Uint8Array.from(response.publicKeyCredentialCreationOptions.challenge, c => c.charCodeAt(0))

      response.publicKeyCredentialRequestOptions.allowCredentials[0].id = Uint8Array.from(response.publicKeyCredentialRequestOptions.allowCredentials[0].id.data)
    
      console.log(" public Key Options ", response.publicKeyCredentialRequestOptions)

      
      const assertion = await navigator.credentials.get({
        publicKey: response.publicKeyCredentialRequestOptions
      });

      
      const assertionCredential = <PublicKeyCredential> assertion //risultato ottenuto da create() per la creazione di nuove credenziali
      
      console.log("Assertion ", assertionCredential)

      //const authAttestationResponse = <AuthenticatorAttestationResponse> assertionCredential.response;
              
      const assertionResponse = <Assertion> assertionCredential.response
      console.log("assertion response ", assertionResponse)
      
       // decode the clientDataJSON into a utf-8 string
       const utf8Decoder = new TextDecoder('utf-8');
       const decodedClientData = utf8Decoder.decode(assertionCredential.response.clientDataJSON)

       // parse the string as an object
      const clientDataObj = JSON.parse(decodedClientData);
      console.log("clientDataObj decoded", clientDataObj)
      
      const body_authOp= {
        clientDataJSON : clientDataObj,
        authenticatorData : encode(assertionResponse.authenticatorData),
        signature : encode(assertionResponse.signature)
        //userHandle : null
      //inviare gli altri campi presenti in response.           
      }

        // login on server
        this.http.post(this.mainService.urlServer+'/actions/create_transaction', body_authOp).subscribe( async (response : any) => {
          console.log(" login response ", response)

          let body_account = {
            username : this.mainService.user.username,
            userID : this.mainService.user.userID
          }


          if(response.bool){
            this.http.post(this.mainService.urlLocalServer+'/account/createTransaction', body_account).subscribe( async (response : any) => {
              /*
              let user : User = {}

              user.addr = response.addr;
              user.amount = response.amount;
              user.username = response.username;

              console.log("user. " , user)
              
              this.mainService.user = user
            */
              //this.router.navigateByUrl('my-profile')
            });
          }

        });


      }, error => {
        console.log('error',error.error.text)
      });
 
  }


  retrieveMyAssets(){
    let body = {
       username : this.mainService.user.username,
       userID : this.mainService.user.userID
    }
 
    this.http.post(this.mainService.urlLocalServer+'/assets/getMyAssets', body).subscribe( async (response : any) => {
 
      this.mainService.user.myAssets = response
      this.myAssetsArray = response
      this.numberOfAssets = this.mainService.user.myAssets?.length
      console.log("this.mainService.user.myAssets", this.mainService.user.myAssets)
      
     });
     
   }

  getAssetByID(asset : any){
    console.log("getassetbyid", asset)
    let body = {
      username : this.mainService.user.username,
      userID : this.mainService.user.userID,
      assetID : asset.idTransaction
    }
    this.http.post(this.mainService.urlLocalServer+'/assets/lookupDataFromIPFSID', body).subscribe( async (response : any) => {
 
      //this.mainService.user.myAssets = response
      console.log("response ", response.data)
      this.mainService.data = response.data
      console.log("data ", this.mainService.data)

      if(this.mainService.data != ''){
        console.log("apro popup")
        document.getElementById('viewAssetButton')?.click()
      }
      
    });
  }
 
 
}
