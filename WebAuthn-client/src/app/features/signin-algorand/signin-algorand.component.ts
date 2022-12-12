import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserType } from 'graphene-pk11';
import { MainService } from 'src/app/service/main.service';
import { User } from '../../interfaces/user';

declare function createAlgorandAccount() : any
 
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


    //var account =  createAlgorandAccount();

    //console.log("account ", account)

    this.http.get(this.mainService.urlServer+'/algorand/create-algorand-account').subscribe( async (response : any) => {

     

      
    
      console.log("response ", response)
      

     

    });
 
  }
}
