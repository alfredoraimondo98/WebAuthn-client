import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/service/main.service';

@Component({
  selector: 'app-signin-algorand',
  templateUrl: './signin-algorand.component.html',
  styleUrls: ['./signin-algorand.component.css']
})
export class SigninAlgorandComponent implements OnInit {

  constructor(private router : Router, private http : HttpClient, private mainService : MainService) { }

  ngOnInit(): void {
  }

  createAccount(form : NgForm){

      
    this.http.get(this.mainService.urlServer+'/algorand/optIn').subscribe( async (response : any) => {
    
      console.log("response ", response)
    });

  }
}
