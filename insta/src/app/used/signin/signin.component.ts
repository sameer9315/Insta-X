import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{HttpClient, HttpErrorResponse} from '@angular/common/http';
import { response } from 'express';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  constructor( private router: Router, private http: HttpClient, private api: ApiService){}
  // constructor(private http: HttpClient){}
    username: String='';
  password: String='';
  result: any;
  errorMessage: any;
  errs='Invalid Username OR Password.';

  at='accessToken';
  rt='refreshToken';
  lt='loginTime';
  ngOnInit(): void {

  }
  onSubmit(){
    const details={
      username: this.username,
      password: this.password,
    }
    this.username='';
    this.password='';

    this.api.signin(details).subscribe((response)=>{
      this.result=response;
      this.errorMessage='';
      
      if(response){
        const accessToken= this.result.accessToken;
        const refreshToken= this.result.refreshToken;
        const time=(Date.now()/1000);
        localStorage.setItem(this.at,accessToken);
        localStorage.setItem(this.rt,refreshToken);
        localStorage.setItem(this.lt,String(time));
        this.router.navigate(['/posts']);
      }

    },(error)=>{
      this.errorMessage=this.errs;
    })
  //   this.http.post(this.url ,details).subscribe((response)=>{
  //             this.result=response;
  //             console.log(response);
  //             if(response){
  //               this.router.navigate(['/posts']);
  //             }else{
  //               this.errorMessage='Invalid Username OR Password.';
  //             }
  //           },(error)=>{
  //             return error;
  //           })


  //     // console.log(`password: ${this.password}`);
  // }
}
}
