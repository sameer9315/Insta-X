import { Component, OnInit, Inject } from '@angular/core';
// import { ApiService } from 'src/app/api.service';
// import { Router } from '@angular/router';
// import{HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-likedby',
  templateUrl: './likedby.component.html',
  styleUrls: ['./likedby.component.css']
})
export class LikedbyComponent {

  size: any;
  err: boolean=false;


  constructor(@Inject(MAT_DIALOG_DATA)public data:any){
    this.size=data.likedBy.length;
    // console.log(data.likedBy[0]);
    if(this.size===0){
      this.err=true;
    }
  }
  likedUser: any=this.data.likedBy;
  count: any=this.data.othersCount;
}
