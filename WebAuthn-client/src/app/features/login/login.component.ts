import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/service/main.service';
import { encode, decode } from 'base64-arraybuffer'
import { Assertion } from '../../interfaces/assertion'

declare function strToArrayBuffer(str: String) : ArrayBuffer;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router, private http : HttpClient, private mainService : MainService) { }

  ngOnInit(): void {
  }


  /*Recupera i dati dal form di registrazione*/
  login(form : NgForm){
    console.log('form data', form.value);
    if( (form.value.username !== null)){
      
       
      let body = {
        username : form.value.username,
      }

      console.log("Username ", body.username)
        
      this.http.post(this.mainService.urlServer+'/auth/getLoginOptions', body).subscribe( async (response : any) => {
        
        console.log("getLoginOptions response ", <PublicKeyCredentialRequestOptions> response)

        //response.publicKeyCredentialRequestOptions.challenge = Uint8Array.from(response.publicKeyCredentialRequestOptions.challenge)
          
        //response.publicKeyCredentialRequestOptions.allowCredentials.id = Uint8Array.from(response.publicKeyCredentialRequestOptions.allowCredentials.id)
        
        
        //response.publicKeyCredentialRequestOptions.challenge = Uint8Array.from(response.publicKeyCredentialRequestOptions.challenge)
        response.publicKeyCredentialRequestOptions.challenge = strToArrayBuffer(response.publicKeyCredentialRequestOptions.challenge) ;//Uint8Array.from(response.publicKeyCredentialCreationOptions.challenge, c => c.charCodeAt(0))

        //response.publicKeyCredentialRequestOptions.allowCredentials.id = Uint8Array.from(response.publicKeyCredentialRequestOptions.allowCredentials.id)
          
       // response.publicKeyCredentialRequestOptions.allowCredentials[0].id = decode(response.publicKeyCredentialRequestOptions.allowCredentials[0].id) //response.publicKeyCredentialRequestOptions.allowCredentials[0].id = decode(response.publicKeyCredentialRequestOptions.allowCredentials[0].id)

       //X response.publicKeyCredentialRequestOptions.allowCredentials[0].id = strToArrayBuffer(response.publicKeyCredentialRequestOptions.allowCredentials[0].id) //response.publicKeyCredentialRequestOptions.allowCredentials[0].id = decode(response.publicKeyCredentialRequestOptions.allowCredentials[0].id)
        response.publicKeyCredentialRequestOptions.allowCredentials[0].id = Uint8Array.from(response.publicKeyCredentialRequestOptions.allowCredentials[0].id.data)
        //response.publicKeyCredentialRequestOptions.allowCredentials[0].id = Uint8Array.from(window.atob(response.publicKeyCredentialRequestOptions.allowCredentials[0].id), c=>c.charCodeAt(0))

        //console.log(" XXXXXXX  dec", response.publicKeyCredentialRequestOptions.allowCredentials[0].id)

        //response.publicKeyCredentialRequestOptions.allowCredentials[0].id = Uint8Array.from(response.publicKeyCredentialRequestOptions.allowCredentials[0].id)
        //response.publicKeyCredentialRequestOptions.allowCredentials[0].id = Uint8Array.from(window.atob(response.publicKeyCredentialRequestOptions.allowCredentials[0].id), c=>c.charCodeAt(0))

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
        
        const body_login = {
          clientDataJSON : clientDataObj,
          authenticatorData : encode(assertionResponse.authenticatorData),
          signature : encode(assertionResponse.signature)
          //userHandle : null
        //inviare gli altri campi presenti in response.           
        }

       

        // login on server
        this.http.post(this.mainService.urlServer+'/auth/login', body_login).subscribe( async (response : any) => {
          console.log(" login response ", response)
        });
          

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




