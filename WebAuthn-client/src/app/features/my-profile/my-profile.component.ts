import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/service/main.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  constructor(private router : Router, private http : HttpClient, public mainService : MainService) { }

  ngOnInit(): void {
    console.log("addr ", this.mainService.user.addr)
  }

  

}
