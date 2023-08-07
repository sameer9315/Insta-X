import { Component } from '@angular/core';
import{HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username?: string;
  email?: string;
  password?: string;
  constructor( private router: Router, private http: HttpClient, private api: ApiService){}
  errorMessage: String='';
  at='accessToken';
  rt='refreshToken';
  lt='loginTime';
  result: any;
  errs='Username OR email Already Taken.'
  ngOnInit(): void{

  }

  onSubmit() {

    const details={
      username: this.username,
      email: this.email,
      password: this.password,
    }
    this.username=this.email=this.password='';

    this.api.signup(details).subscribe((response)=>{
      // console.log(response);
      this.errorMessage='';
      if(response){
        this.result=response;
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
      // console.log(this.errorMessage)

    })
    // this.http.post(this.url ,details).subscribe((response)=>{
    //   console.log(response);
    //   if(response){
    //     this.router.navigate(['/posts']);
    //   }else{
    //     this.errorMessage='Username OR email Already Taken.';
    //     console.log(this.errorMessage);
    //   }
    // },(error)=>{
    //   return error;
    // })
    // console.log('Registration form submitted!');
    // console.log(`UserName: ${this.username}`);
    // console.log(`Email: ${this.email}`);
    // console.log(`Password: ${this.password}`);

// console.log(`password: ${this.password}`);
}



}
