import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{HttpClient, HttpErrorResponse} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import { response } from 'express';
import { ApiService } from 'src/app/api.service';
import { SharedService } from 'src/app/shared.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  loginForm: FormGroup;
  constructor( private router: Router,private shared: SharedService, private http: HttpClient, private api: ApiService, private fb: FormBuilder){
    this.loginForm=this.fb.group({
      username: ['',Validators.required],
      password: ['', [Validators.required]]
    })
  }
    username: String='';
  password: String='';
  result: any;
  errorMessage: any;
  errs='Invalid Username OR Password.';
  showPassword:boolean=false;
  at='accessToken';
  rt='refreshToken';
  lt='loginTime';
  us='username';

  show(){
    this.showPassword=!this.showPassword;
  }
  ngOnInit(): void {

  }
  onSubmit(){
    if(this.loginForm.valid){
      const details= this.loginForm.value;
    // console.log(details);
    this.api.signin(details).subscribe((response:any)=>{
      this.result=response;
      this.errorMessage='';
        if(response){
        const accessToken= response.message.accessToken;
        const refreshToken= response.message.refreshToken;
        const time=(Date.now()/1000);
        localStorage.setItem(this.at,accessToken);
        localStorage.setItem(this.rt,refreshToken);
        localStorage.setItem(this.lt,String(time));
        localStorage.setItem(this.us,details.username);
        this.shared.setUsername(details.username);
        this.router.navigate(['/posts']);
      }


    },(error)=>{
      // console.log(error);
      this.errorMessage=this.errs;
    })
  }
}
}
