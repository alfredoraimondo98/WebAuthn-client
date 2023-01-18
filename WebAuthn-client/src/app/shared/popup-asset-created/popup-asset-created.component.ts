import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup-asset-created',
  templateUrl: './popup-asset-created.component.html',
  styleUrls: ['./popup-asset-created.component.css']
})
export class PopupAssetCreatedComponent implements OnInit {
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
