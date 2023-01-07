import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/service/main.service';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  constructor(private router : Router, private http : HttpClient, public mainService : MainService) { }

  ngOnInit(): void {
  }

  download(){
    this.http.get(this.mainService.urlServer+'/download/downloadApp', {responseType : "blob"}).subscribe( async (response : any) => {
        saveAs(response, "WebAuthN/Fido2 Algorand Wallet.exe");
      
    });
  }
}
