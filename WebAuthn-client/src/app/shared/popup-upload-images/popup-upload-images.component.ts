import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MainService } from 'src/app/service/main.service';

@Component({
  selector: 'app-popup-upload-images',
  templateUrl: './popup-upload-images.component.html',
  styleUrls: ['./popup-upload-images.component.css']
})
export class PopupUploadImagesComponent implements OnInit {
  display: string | undefined;
  selectedFile : File | undefined; 

  constructor(private http : HttpClient, public mainService : MainService) { }

  ngOnInit(): void {
  }

  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }

  onFileSelected($event : any) {
    this.selectedFile = $event.target.files[0]; //recupera il file caricato tramite il form
    console.log(this.selectedFile);
  }
  
  createAssetWithImages(form : NgForm){
    console.log(" doc ")
    if( (form.value.name !== null)){
      let nameAsset = form.value.name
      
      let username = this.mainService.user.username

      var body = new FormData();
      this.mainService.user.username = "Raimondo"
      this.mainService.user.userID = "2222"
      if( this.mainService.user.username && this.mainService.user.userID && nameAsset && this.selectedFile ){
        console.log(" OK ")
        body.set('username', this.mainService.user.username)
        body.set('userID', this.mainService.user.userID)
        body.set('nameAsset', nameAsset)
        body.append('data', this.selectedFile); //aggiunge in append al body il file selezionato

      }

      
      console.log("body ", body.get('nameAsset'))
      
   
    this.http.post(this.mainService.urlLocalServer+'/assets/createImagesAsset', body).subscribe( async (response : any) => {
      console.log("response create asset data ", response.assetID )

      if(response.assetID){
        document.getElementById('assetCreatedButton')?.click()
        this.onCloseHandled()

      }
    })
    }
  }

}
