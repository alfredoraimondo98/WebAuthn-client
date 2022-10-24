import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CheckboxRequiredValidator, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/service/main.service';
import { encode } from 'base64-arraybuffer'


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
   

  constructor(private router : Router, private http : HttpClient, private mainService : MainService ) { }

  ngOnInit(): void {
  }


  /*Recupera i dati dal form di registrazione*/
  getSigninData(form : NgForm){
    
    console.log('form data', form.value);
    if( (form.value.username !== null)){
      
      let body = {
        username : form.value.username,
      }

      console.log("Username ", body.username)
      
     this.http.post(this.mainService.urlServer+'/auth/getChallenge', body).subscribe( async (response : any) => {
        console.log("getChallenge response ", response)

        response.publicKeyCredentialCreationOptions.challenge = Uint8Array.from(response.publicKeyCredentialCreationOptions.challenge)
        
        response.publicKeyCredentialCreationOptions.user.id = Uint8Array.from(response.publicKeyCredentialCreationOptions.user.id)
 
        const newCredential = await navigator.credentials.create({
          publicKey: response.publicKeyCredentialCreationOptions
        });
 
 
        console.log("newCredential ", newCredential)
                
        const credential = <PublicKeyCredential> newCredential //risultato ottenuto da create() per la creazione di nuove credenziali

        //const authenticatorAttestation = <AuthenticatorAttestationResponse> credential.response
        
        const authAttestationResponse = <AuthenticatorAttestationResponse> credential.response;
        const clientExtensionResults = credential.getClientExtensionResults();

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
          attestationObject : base64AttestationObject
        }

        console.log("body signin", body_signin)

        // sende to server info about user and new credential 
        this.http.post(this.mainService.urlServer+'/auth/signin', body_signin).subscribe( async (response : any) => {

          console.log("signin response ", response)

        }, error => {
          console.log('error',error.error.text)
        })
        
 
         

        //this.router.navigateByUrl('login')
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

 