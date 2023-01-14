import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CheckboxRequiredValidator, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/service/main.service';
import { decode, encode } from 'base64-arraybuffer'
import { User } from '../../interfaces/user'

// declare the javascript function here
declare function loadPKCS11(): any;
declare function arrayBufferToString(buffer : ArrayBuffer) : any;
declare function strToArrayBuffer(str: String) : ArrayBuffer;
declare function decodeCBOR(authAttestationResponse : AuthenticatorAttestationResponse) : any;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
   

  constructor(private router : Router, private http : HttpClient, public mainService : MainService) { }

  ngOnInit(): void {
    //loadPKCS11();

   
  }


  /*Recupera i dati dal form di registrazione*/
  getSigninData(form : NgForm){
    
    console.log('form data', form.value);
    if( (form.value.username !== null)){
      var username = form.value.username
      let body = {
        username : form.value.username,
      }

      console.log("Username ", body.username)
        
      this.http.post(this.mainService.urlServer+'/auth/getSigninOptions', body).subscribe( async (response : any) => {
        
        console.log("getChallenge response ", response)

        let userID = response.publicKeyCredentialCreationOptions.user.id

        //response.publicKeyCredentialCreationOptions.challenge = decode(response.publicKeyCredentialCreationOptions.challenge) //decode challenge from base64 to ArrayBuffer
        response.publicKeyCredentialCreationOptions.challenge = strToArrayBuffer(response.publicKeyCredentialCreationOptions.challenge) ;//Uint8Array.from(response.publicKeyCredentialCreationOptions.challenge, c => c.charCodeAt(0))
        //console.log("challenge string :" , new TextDecoder().decode(response.publicKeyCredentialCreationOptions.challenge))
        response.publicKeyCredentialCreationOptions.user.id = strToArrayBuffer(response.publicKeyCredentialCreationOptions.user.id) ;//Uint8Array.from(response.publicKeyCredentialCreationOptions.challenge, c => c.charCodeAt(0))

        //response.publicKeyCredentialCreationOptions.user.id = decode(response.publicKeyCredentialCreationOptions.user.id)
        //response.publicKeyCredentialCreationOptions.user.id = Uint8Array.from(response.publicKeyCredentialCreationOptions.user.id)
        //response.publicKeyCredentialCreationOptions.user.id = Uint8Array.from(window.atob(response.publicKeyCredentialCreationOptions.user.id), c=>c.charCodeAt(0))



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
          username : username,
          credentialId : credential.rawId, //credentialId
          userID : userID
        }

        

        console.log("body signin", body_signin)

        // send to server info about user and new credential 
        this.http.post(this.mainService.urlServer+'/auth/signin', body_signin).subscribe( async (response : any) => {

          console.log("signin response ", response)

           
          if(response.bool){
            console.log("bool ", response.bool, response)
            let body_account = {
              username : username,
              userID : response.userID
            }
            this.http.post(this.mainService.urlLocalServer+'/account/create', body_account).subscribe( async (response : any) => {

              console.log("response from wallet app electron ", response)

            })
          }
           

        }, error => {
          console.log('error',error.error.text)
        })
          
  
          

        this.router.navigateByUrl('login')
      }, error => {
        console.log('error',error.error.text)
      })
  
      /*}else{ //apre il modal che informa l'utente che deve compilare i campi restanti della registrazione
        document.getElementById('modalRegistrazioneNonCompleta').click()
      }
      */
    }
  }

}

 