import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {

  file! : File;
  postForm: FormGroup;
  filePreviewUrls:string |null=null;


  constructor(private fb: FormBuilder,@Inject(MAT_DIALOG_DATA)public data:any, private api: ApiService, private router: Router, private dialogRef: MatDialogRef<CreatePostComponent>){
    this.postForm=this.fb.group({
      image: [null],
      content: ['']
    })
  }

  onFileSelected(event: any){
    this.file=event.target.files[0];
    // this.filePreviewUrls={};
    const reader=new FileReader();
    reader.onload=(e:any)=>{
      this.filePreviewUrls=e.target.result;
    }
    reader.readAsDataURL(this.file)
  //   for(const file of this.file){
  //     const reader= new FileReader();
  //   reader.onload=(e:any)=>{
  //     this.filePreviewUrls[file.name]=e.target.result;
  //   }
  //   reader.readAsDataURL(file);
  // }
  }
  // removeImage(index:any){
  //   // this.file.splice(index,1);
  //   const removedFileName=this.file.name;
  //   delete this.filePreviewUrls[removedFileName];
  // }
  onSubmit(){
    if(this.postForm.valid){
      const formData=new FormData();
      // for(const file of this.file){
      //   formData.append('image', file,file.name);
      // }
      formData.append('image',this.file);
      formData.append('content',this.postForm.value.content);
      console.log(formData);
      this.api.addPost(formData).subscribe((response)=>{
      });
      this.router.navigate(['/posts']);
      this.dialogRef.close();
    }
  }
  }
