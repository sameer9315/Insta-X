import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import {MatDialog} from '@angular/material/dialog';
import { CreatePostComponent } from '../create-post/create-post.component';
import { Router } from '@angular/router';
import { response } from 'express';
import { LikedbyComponent } from '../likedby/likedby.component';
import { ChatComponent } from '../chat/chat.component';


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
  likedby: any[]=[];
  result:any;
  othersCountArray: any[]=[];
  isLiked: boolean=false;
  expandcaption : {[postId: string]:boolean}={};
  enlargedImage: string | null=null;
  user:any='';
  constructor(private api:ApiService, private dialog: MatDialog, private router: Router){


  }

  ngOnInit(): void {
    this.posts=null;
    this.likedby=[];
    this.othersCountArray=[];
     this.api.fetchall().subscribe((response:any)=>{
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

  getLikedBy(postid:any){
    const lbyEntry=this.likedby.find(data=>data.postId===postid);
    return lbyEntry? lbyEntry.likedBy: [];
  }

  getOthercount(postid: any){
    const others=this.othersCountArray.find(data=>data.postId===postid);
    return others.othersCount;
  }

  fetchpostLike(){
    for(let i=0;i<this.posts.length;i++){
       this.api.getLikedUsers(this.posts[i]._id).subscribe((response:any)=>{
             this.likedby.push({postId: this.posts[i]._id,likedBy: response.message.likedBy});
             this.othersCountArray.push({postId: this.posts[i]._id,othersCount: response.message.othersCount});

         });
    }
    // console.log(this.likedby,this.othersCountArray);
  }

  showPosts(){
    this.router.navigate(['/user']);
  }

  private fetchpostLiked(){
    this.api.getPostsLiked().subscribe((response:any)=>{
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

  like(postid:any){
    // post.isLiked
    this.api.likeit(postid).subscribe((response:any)=>{
      // console.log(response);
      // if(response.message.user){
      //   isPostLiked(post._id)=!isPostLiked(post._id)
      // }
    })
    this.ngOnInit();
  }

  chatPopup(){
    const dialogRef=this.dialog.open(ChatComponent,{
      width:'40%',
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

  logout(){

    this.api.logout();
    this.router.navigate(['/login']);
  }

}
