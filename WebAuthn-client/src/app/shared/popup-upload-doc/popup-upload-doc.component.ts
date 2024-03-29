import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MainService } from 'src/app/service/main.service';

@Component({
  selector: 'app-popup-upload-doc',
  templateUrl: './popup-upload-doc.component.html',
  styleUrls: ['./popup-upload-doc.component.css']
})
export class PopupUploadDocComponent implements OnInit {
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
    console.log("file" , this.selectedFile?.name);
  }
  
  createAssetWithDoc(form : NgForm){
    console.log(" doc ")
    if( (form.value.name !== null)){
      let nameAsset = form.value.name
      
      let username = this.mainService.user.username

      var body = new FormData();
      
      if( this.mainService.user.username && this.mainService.user.userID && nameAsset && this.selectedFile ){
        console.log(" OK ")
        body.set('username', this.mainService.user.username)
        body.set('userID', this.mainService.user.userID)
        body.set('nameAsset', nameAsset)
        body.set('filename', this.selectedFile?.name)
        body.append('data', this.selectedFile); //aggiunge in append al body il file selezionato

      }

      
      console.log("body ", body.get('username') )
      
   
    this.http.post(this.mainService.urlLocalServer+'/assets/createDocAsset', body).subscribe( async (response : any) => {
      console.log("response create asset data ", response.assetID )

      if(response.assetID){
        document.getElementById('assetCreatedButton')?.click()
        this.onCloseHandled()

      }
    })
  }
/*
    const body = new FormData(); //costruisce il body da inviare nella richiesta
    body.set('name', 'prodotto');
    body.append('image', this.selectedFile); //aggiunge in append al body il file selezionato
    */
  }
}
