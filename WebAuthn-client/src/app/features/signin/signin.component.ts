import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/service/main.service';
 
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
      //procedi alla registrazione
      let body = {
        username : form.value.username,
      }

      console.log("Username ", body.username)
      
     this.http.post(this.mainService.urlServer+'/auth/getChallenge', body).subscribe( async (response : any) => {
        console.log("OK ", response)

        response.publicKeyCredentialCreationOptions.challenge = Uint8Array.from(
          response.publicKeyCredentialCreationOptions.challenge)
        
        response.publicKeyCredentialCreationOptions.user.id = Uint8Array.from(
          response.publicKeyCredentialCreationOptions.user.id)

        const credential = await navigator.credentials.create({
          publicKey: response.publicKeyCredentialCreationOptions
        });

        console.log("Credential ", credential)
      
        
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
