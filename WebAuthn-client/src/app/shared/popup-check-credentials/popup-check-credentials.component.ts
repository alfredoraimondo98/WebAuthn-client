import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/service/main.service';
import { decode, encode } from 'base64-arraybuffer'

declare function strToArrayBuffer(str: String) : ArrayBuffer;

@Component({
  selector: 'app-popup-check-credentials',
  templateUrl: './popup-check-credentials.component.html',
  styleUrls: ['./popup-check-credentials.component.css']
})
export class PopupCheckCredentialsComponent implements OnInit {
  display: string | undefined;
  
  constructor(private http : HttpClient, public mainService : MainService) { }

  ngOnInit(): void {
  }

  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  } 

  updateCredentials(){
    let body = {
      username : this.mainService.user.username,
      userID : this.mainService.user.userID
    }
    console.log("body ", body)

    this.http.post(this.mainService.urlServer+'/auth/updateCredentialsGetOptions', body).subscribe( async (response : any) => {
      console.log("getChallenge response ", response)
        
      response.publicKeyCredentialCreationOptions.challenge = strToArrayBuffer(response.publicKeyCredentialCreationOptions.challenge) ;//Uint8Array.from(response.publicKeyCredentialCreationOptions.challenge, c => c.charCodeAt(0))
      response.publicKeyCredentialCreationOptions.user.id = strToArrayBuffer(response.publicKeyCredentialCreationOptions.user.id) ;//Uint8Array.from(response.publicKeyCredentialCreationOptions.challenge, c => c.charCodeAt(0))

      const newCredential = await navigator.credentials.create({
        publicKey: response.publicKeyCredentialCreationOptions
      });
      

      console.log("newCredential ", newCredential)
                
      const credential = <PublicKeyCredential> newCredential //risultato ottenuto da create() per la creazione di nuove credenziali

      //const authenticatorAttestation = <AuthenticatorAttestationResponse> credential.response
        
      const authAttestationResponse = <AuthenticatorAttestationResponse> credential.response;
      const clientExtensionResults = credential.getClientExtensionResults();
      const credentialId = credential.id

      console.log(" **** authenticator attestation response ", authAttestationResponse )
      console.log(" **** client extension results ", clientExtensionResults)

      
      // decode the clientDataJSON into a utf-8 string
      const utf8Decoder = new TextDecoder('utf-8');
      const decodedClientData = utf8Decoder.decode(authAttestationResponse.clientDataJSON)

      // parse the string as an object
      const clientDataObj = JSON.parse(decodedClientData);
      console.log("clientDataObj decoded", clientDataObj)

        
      // Encode attestationObject to base64 to send it to server
      // note: a CBOR decoder library is needed here.
      const base64AttestationObject = encode(authAttestationResponse.attestationObject)
      
      // body signin
      let body_signin = {
        clientDataJSON : clientDataObj,
        attestationObject : base64AttestationObject,
        username : this.mainService.user.username,
        credentialId : credential.rawId, //credentialId
        userID : this.mainService.user.userID
      }

      

      console.log("body signin", body_signin)

      // send to server info about user and new credential 
      this.http.post(this.mainService.urlServer+'/auth/updateCredentials', body_signin).subscribe( async (response : any) => {

        console.log("signin response ", response)

        if(response.bool){
          document.getElementById('updatedCredentialsButton')?.click()
          this.onCloseHandled()

        }
         

      }, error => {
        console.log('error',error.error.text)
      })
 
    })

  }

  //rimuove le credenziali dell'utente sul server RP e il wallet memorizzato localmente
  deleteCredentials(){
    let body = {
      username : this.mainService.user.username,
      userID : this.mainService.user.userID
    }

    this.http.post(this.mainService.urlServer+'/auth/deleteCredentials', body).subscribe( async (response : any) => {
      console.log("getChallenge response ", response)

      this.http.post(this.mainService.urlLocalServer+'/account/deleteWallet', body).subscribe( async (response : any) => {
        if(response.deleted){
          window.location.replace("/homepage");

        }

      })
    })
  }


}
