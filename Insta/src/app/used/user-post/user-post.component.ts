import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import {MatDialog} from '@angular/material/dialog';
import { CreatePostComponent } from '../create-post/create-post.component';
import { Router } from '@angular/router';
import { response } from 'express';
import { LikedbyComponent } from '../likedby/likedby.component';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.css']
})
export class UserPostComponent  {
  posts: any=null;
  errorMessage: any;
  imageurl='http://localhost:3000/uploads/';
  likedPost: any;
  postLiked: boolean= false;
  likedby: any[]=[];
  result:any;
  expandcaption : {[postId: string]:boolean}={};

othersCountArray: any[]=[];
enlargedImage: string | null=null;

confirmMessage='Are You Sure you want to delete this Post?';
  constructor(private api:ApiService, private dialog: MatDialog, private router: Router){

  }
  ngOnInit(): void{
    this.posts=null;
    this.likedby=[];
    this.othersCountArray=[];
     this.api.fetchUserPost().subscribe((response:any)=>{
      this.posts=response.message;
      this.errorMessage='';
      this.fetchpostLiked();
      // console.log(this.posts)
      this.fetchpostLike();
     },(error)=>{
      this.api.logout();
      this.router.navigate(['/login']);
    });
  }
  toggleCaption(postid:string){
    this.expandcaption[postid]=!this.expandcaption[postid];
  }
  openImageModal(imageurl:string){
    this.enlargedImage=imageurl;
  }
  closeEnlargedImage(){
    this.enlargedImage=null;
  }
  deletePost(postid:any){
    const isConfirmed=window.confirm(this.confirmMessage);
    if(isConfirmed){
      this.api.deletePost(postid).subscribe((response)=>{
        // console.log(response);
      });
    }
    this.ngOnInit();
  }
  getOthercount(postid: any){
    const others=this.othersCountArray.find(data=>data.postId===postid);
    return others.othersCount;
  }
  getLikedBy(postid:any){
    const lbyEntry=this.likedby.find(data=>data.postId===postid);
    return lbyEntry? lbyEntry.likedBy: [];
  }

  fetchpostLike(){
    for(let i=0;i<this.posts.length;i++){
       this.api.getLikedUsers(this.posts[i]._id).subscribe((response:any)=>{
             this.likedby.push({postId: this.posts[i]._id,likedBy: response.message.likedBy});
             this.othersCountArray.push({postId: this.posts[i]._id,othersCount: response.message.othersCount});
            //  this.othersCountArray.push(response.message.othersCount);
         });
    }
  }

  private fetchpostLiked(){
    this.api.getPostsLiked().subscribe((response: any)=>{
      this.likedPost=response.message;
      // console.log(this.likedPost);
    })
  }

  isPostLiked(postid:string):boolean{
    return this.likedPost.some((post: any)=>post._id===postid);
  }

  viewLikes(postid: any){
    this.api.getLikedUsers(postid).subscribe((response:any)=>{
       this.result=response.message;
      this.dialog.open(LikedbyComponent,{
      maxWidth: '1200px',
      width:'90%',
      data:{
        likedBy: this.result.likedBy,
        othersCount: this.result.othersCount,
      },
    });
    })

  }

  createPost(){
    const accessToken=String(localStorage.getItem('accessToken'));
    if(accessToken){
       this.openPopup();
    }else{
      this.router.navigate(['/login']);
    }
  }
  openPopup(): void{
    const dialogRef=this.dialog.open(CreatePostComponent,{
      width:'50%',
    });
    dialogRef.afterClosed().subscribe(()=>{
      this.ngOnInit();
    })
  }

  like(postid:any){
    this.api.likeit(postid).subscribe((response)=>{
      // console.log(response);
    })

    this.ngOnInit();
  }
  logout(){

    this.api.logout();
    this.router.navigate(['/login']);
  }
}
