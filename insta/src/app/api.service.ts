import { Injectable } from '@angular/core';
import{HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import{catchError} from 'rxjs/operators';
import{throwError} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  signinurl='http://localhost:3000/api/signin';
  signupUrl='http://localhost:3000/api/users';
  postsUrl='http://localhost:3000/fetch';
  createPostUrl= 'http://localhost:3000/posts';
  likeUrl='http://localhost:3000/like';
  likedPostUrl='http://localhost:3000/getlikedpost';
  likedUserUrl='http://localhost:3000/getusers';
  // likeremoveUrl='http://localhost:3000/like/delete';
  // logoutUrl='http://localhost:3000/logout';



  signin(data:any){
    return this.http.post(this.signinurl,data).pipe(catchError((error)=>{
      return throwError(error);

    })
    );
  }

  signup(data:any){
    return this.http.post(this.signupUrl,data).pipe(catchError((error)=>{
      return throwError(error);
    }))
  }
  likeit(postid:any){
    // console.log("api likeit");
    const bodyData={
      postObjectId: postid,
    }
    const accessToken=String(localStorage.getItem('accessToken'));
    const refrehToken=String(localStorage.getItem('refreshToken'));
    const httpOptions={
      headers: new HttpHeaders({
        'Authorization' : accessToken,
        'Refresh-Token' : refrehToken,
      }),

    }
    // console.log(bodyData);
    return this.http.post<any>(this.likeUrl, bodyData,  httpOptions).pipe(catchError((error)=>{
      return throwError(error);
    }));
  }

  addPost(formData:FormData){
    // console.log("m api hu post ka");
    const accessToken=String(localStorage.getItem('accessToken'));
    const refrehToken=String(localStorage.getItem('refreshToken'));
    // const headers={
    //   'Authorization' : accessToken,
    //   'Refresh-Token' : refrehToken,
    // }
    const httpOptions={
      headers: new HttpHeaders({
        'Authorization' : accessToken,
        'Refresh-Token' : refrehToken,
      }),
    }
    // console.log(httpOptions);
    return this.http.post(this.createPostUrl , formData, httpOptions).pipe(catchError((error)=>{
      return throwError(error);
    }));
  }

  fetchall(){
    // console.log('cccccccc');
    const accessToken=String(localStorage.getItem('accessToken'));
    const refrehToken=String(localStorage.getItem('refreshToken'));
    const httpOptions={
      headers: new HttpHeaders({
        'Authorization' : accessToken,
        'Refresh-Token' : refrehToken,
      }),
    }
    return this.http.get(this.postsUrl,httpOptions).pipe(catchError((error)=>{
      return throwError(error);
    }
    ));
  }

  getPostsLiked(){
    const accessToken=String(localStorage.getItem('accessToken'));
    const refrehToken=String(localStorage.getItem('refreshToken'));
    const httpOptions={
      headers: new HttpHeaders({
        'Authorization' : accessToken,
        'Refresh-Token' : refrehToken,
      }),
    }
    return this.http.get(this.likedPostUrl,httpOptions).pipe(catchError((error)=>{
      return throwError(error);
    }))
  }
  getLikedUsers(postid:any){
    const bodyData={
      postObjectId: postid,
    }
    const accessToken=String(localStorage.getItem('accessToken'));
    const refrehToken=String(localStorage.getItem('refreshToken'));
    const httpOptions={
      headers: new HttpHeaders({
        'Authorization' : accessToken,
        'Refresh-Token' : refrehToken,
      }),
    }
    return this.http.post(this.likedUserUrl,bodyData, httpOptions).pipe(catchError((error)=>{
      return throwError(error);
    }))
  }


  removeLike(postid: any){
    const bodyData={
      postObjectId: postid,
    }
    const accessToken=String(localStorage.getItem('accessToken'));
    const refrehToken=String(localStorage.getItem('refreshToken'));
    const httpOptions={
      headers: new HttpHeaders({
        'Authorization' : accessToken,
        'Refresh-Token' : refrehToken,
      }),

    }
    return this.http.delete(this.likeUrl,{...httpOptions,body: bodyData}).pipe(catchError((error)=>{
      return throwError(error);
    }))
  }

  logout(){
    // const accessToken=String(localStorage.getItem('accessToken'));
    // const refrehToken=String(localStorage.getItem('refreshToken'));
    // const httpOptions={
    //   headers: new HttpHeaders({
    //     'Authorization' : accessToken,
    //     'Refresh-Token' : refrehToken,
    //   }),

    // }

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('loginTime');
    // return this.http.put(this.logoutUrl,httpOptions);


  }
}


