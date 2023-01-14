import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup-updated-credentials',
  templateUrl: './popup-updated-credentials.component.html',
  styleUrls: ['./popup-updated-credentials.component.css']
})
export class PopupUpdatedCredentialsComponent implements OnInit {
  display: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  } 
}
