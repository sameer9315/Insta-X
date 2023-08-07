import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import {MatDialog} from '@angular/material/dialog';
import { CreatePostComponent } from '../create-post/create-post.component';
import { Router } from '@angular/router';
import { response } from 'express';
import { LikedbyComponent } from '../likedby/likedby.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[MatDialog],
})
export class HomeComponent {

  posts: any;
  errorMessage: any;
  imageurl='http://localhost:3000/uploads/';
  likedPost: any;
  postLiked: boolean= false;

  constructor(private api:ApiService, private dialog: MatDialog, private router: Router){


  }

  ngOnInit(): void {
     this.api.fetchall().subscribe((response)=>{
      this.posts=response;
      // this.result=response;
      // console.log(this.posts);
      this.errorMessage='';
      this.fetchpostLiked();
     },(error)=>{
      this.api.logout();
      this.router.navigate(['/login']);
      // this.errorMessage='Login Again!! Session Expired';
    });
  }

  private fetchpostLiked(){
    this.api.getPostsLiked().subscribe((response)=>{
      this.likedPost=response;
      // console.log(this.likedPost.posts);
    })
  }

  isPostLiked(postid:string):boolean{
    return this.likedPost.posts.some((post: any)=>post._id===postid);
    // if(liked){
    //   this.likeButton=!this.likeButton;
    //  this.likeButton=!this.likeButton;

    //   return true;
    // }
    // return false;
  }

  viewLikes(postid: any){
    this.api.getLikedUsers(postid).subscribe((response)=>{
      // console.log(response);
      this.dialog.open(LikedbyComponent,{
      maxWidth: '1200px',
      width:'90%',
      data:{
        likedBy: response,
      },
    });
    })
    // console.log('View Clicked')

  }

  like(postid:any){
    console.log('LikeClicked');
    if(this.isPostLiked(postid)){
      this.api.removeLike(postid).subscribe((response)=>{
        console.log(response);
      })
    }else{
    this.api.likeit(postid).subscribe((response)=>{
      console.log(response);
    })
  }
    this.ngOnInit();
  }


  createPost(){
    const accessToken=String(localStorage.getItem('accessToken'));
    // const refreshToken=String(localStorage.getItem('refreshToken'));
    if(accessToken){
       this.openPopup();
    }else{
      this.router.navigate(['/login']);
    }
  }
  openPopup(): void{
    const dialogRef=this.dialog.open(CreatePostComponent,{
      maxWidth: '1200px',
      width:'90%',
    });
    dialogRef.afterClosed().subscribe(()=>{
      this.ngOnInit();
    })
    // this.dialog.open(CreatePostComponent,{
    //   maxWidth: '1200px',
    //   width:'90%',
    // })
  }

  logout(){
    // this.api.logout().subscribe((response)=>{
    //   console.log(response);
    // });
    this.api.logout();
    this.router.navigate(['/login']);
  }
}
