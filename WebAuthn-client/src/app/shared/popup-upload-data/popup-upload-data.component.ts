import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MainService } from 'src/app/service/main.service';

@Component({
  selector: 'app-popup-upload-data',
  templateUrl: './popup-upload-data.component.html',
  styleUrls: ['./popup-upload-data.component.css']
})
export class PopupUploadDataComponent implements OnInit {
  display: string | undefined

  constructor(private http : HttpClient, public mainService : MainService) { }

  ngOnInit(): void {
  }


  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }
  
  createAssetWithData(form : NgForm){
    console.log("form ", form.value.name)
    if( (form.value.name !== null && form.value.data !== null)){
        let nameAsset = form.value.name
        let dataAsset = form.value.data
      console.log("form ", form.value.name)
        let body = {
          username : this.mainService.user.username,
          userID : this.mainService.user.userID,
          nameAsset : nameAsset,
          dataAsset : dataAsset
        }

        console.log("body ", body)
    
      this.http.post(this.mainService.urlLocalServer+'/assets/createAsset', body).subscribe( async (response : any) => {
        console.log("response create asset data ", response.assetID )

        if(response.assetID){
          document.getElementById('assetCreatedButton')?.click()
          this.onCloseHandled()

        }
      })
    }

  }
}
