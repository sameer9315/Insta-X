import { Component} from '@angular/core';
import { FormBuilder , FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import{HttpClient, HttpErrorResponse} from '@angular/common/http';
import { response } from 'express';
// import {errorLoginMessage} from
// import * as jwt_decode from 'jwt-decode';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  constructor( private api: ApiService){
    this.checkTokenExpiration();
  }

  // private check(refrehToken: any){
  //   const decodedToken=jwt_decode(refrehToken);
  // }

  checkTokenExpiration(){
    const accessToken= localStorage.getItem('accessToken');
    const refreshToken= localStorage.getItem('refreshToken');
    const loginTime=localStorage.getItem('loginTime');
    const expTime=Number(loginTime)+14400;
    const currentTime=(Date.now()/1000);

    if(expTime<currentTime){
      this.api.logout();
    }
  }


//   errorMessage: any;

// loginForm?: FormGroup;
//   username?: string;
//   password?: string;
//   result: any;
//   constructor(private  formBuilder: FormBuilder, private router: Router, private http: HttpClient){}
//   ngOnInit(): void {
//     console.log('Hello');
//     this.loginForm=this.formBuilder.group({
//       username: ['', Validators.required],
//       password: ['', Validators.required],
//     })
//   }
//   onSubmit(){
//     this.errorMessage=null;
//     const details={
//       username: this.loginForm.value.username,
//       password: this.loginForm.value.password,
//     }
//     if(this.loginForm.valid){
//       this.http.post(this.url,details).subscribe((response)=>{
//         this.result=response;
//         if(this.result.success){
//           this.router.navigate(['/posts']);
//         }else{
//           this.errorMessage='Invalid Username OR Password.';
//         }
//       },(error)=>{
//         return error;
//       })
//     }
//     // console.log(`username: ${this.username}`);
//     // console.log(`password: ${this.password}`);
//   }

}
