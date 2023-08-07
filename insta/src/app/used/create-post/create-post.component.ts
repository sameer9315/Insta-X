import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import{HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { response } from 'express';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  // username?: string;
// FormData={
//     content: '',
//     image: null,
//   }
  content: string='';
  file:any;

  constructor(@Inject(MAT_DIALOG_DATA)public data:any, private api: ApiService, private router: Router, private dialogRef: MatDialogRef<CreatePostComponent>){

  }

  onFileSelected(event: any){
    // const inputElement=event.target as HTMLInputElement;
    // if(inputElement.files && inputElement.files.length>0){
    //   this.FormData.image =inputElement.files[0];
    // }
    this.file=event.target.files[0];
  }

  onSubmit(){

      // console.log("Heloo form");
      let formData=new FormData();
      formData.set('image', this.file);
      formData.set('content',this.content);
      // console.log(formData);

      // const results=this.http.post

      this.api.addPost(formData).subscribe((response)=>{
        // console.log(response);
      });
           this.router.navigate(['/posts']);

      // this.selectedFile=null;
      // console.log(result);
      this.content='';
      this.dialogRef.close();
    }
  }
