import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
 
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  username : string = "";


  constructor() { }

  ngOnInit(): void {
  }


  /*Recupera i dati dal form di registrazione*/
  getSigninData(form : NgForm){
    console.log('form data', form.value);
    if( (form.value.username !== null)){
      //procedi alla registrazione
      let body = {
        username : form.value.nome,
      }

      this.username = form.value.username
      console.log("Username ", this.username)
      
     /* this.http.post(this.mainService.urlServer+'/auth/register', body)
      .subscribe( (response : any) => {
        this.router.navigateByUrl('login')
      }, error => {
        console.log('error',error.error.text)
      })

      */

    /*}else{ //apre il modal che informa l'utente che deve compilare i campi restanti della registrazione
      document.getElementById('modalRegistrazioneNonCompleta').click()
    }
    */
  }
  }

}
