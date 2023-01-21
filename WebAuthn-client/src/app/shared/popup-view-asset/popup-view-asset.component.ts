import { Component, Input, OnInit } from '@angular/core';
import { MainService } from 'src/app/service/main.service';

@Component({
  selector: 'app-popup-view-asset',
  templateUrl: './popup-view-asset.component.html',
  styleUrls: ['./popup-view-asset.component.css']
})
export class PopupViewAssetComponent implements OnInit {
  display: string | undefined;

  constructor( public mainService : MainService) { }

  ngOnInit(): void {
  }

  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }
}
