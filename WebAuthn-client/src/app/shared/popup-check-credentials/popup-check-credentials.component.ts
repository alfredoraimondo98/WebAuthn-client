import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/service/main.service';

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
      credentialId : this.mainService.user.credentialId
    }

    this.http.post(this.mainService.urlServer+'/auth/updateCredentials', body).subscribe( async (response : any) => {
      console.log("response")
    })

  }


}
