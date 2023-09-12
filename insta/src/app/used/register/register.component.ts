import { Component } from '@angular/core';
import{HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrationForm: FormGroup;
  passwordMatch=false;
  constructor( private router: Router,private  shared: SharedService, private http: HttpClient, private api: ApiService, private fb: FormBuilder){
    this.registrationForm=this.fb.group({
      username: ['',[Validators.required,Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(8)]],
      password2:['',[Validators.required]],
      // {Validators: this.confirmPassword.bind(this)},
    });

    this.registrationForm.get('password2')?.valueChanges.subscribe(()=>{
      this.passwordMatch=  this.registrationForm.get('password')?.value!==this.registrationForm.get('password2')?.value;

    })

  }


  passwordMatches(){
    return this.registrationForm.get('password')===this.registrationForm.get('password2');
  }
  // confirmPassword(formgroup: FormGroup){

  // }
  errorMessage: String='';
  at='accessToken';
  rt='refreshToken';
  lt='loginTime';
  result: any;
  errs='Username OR email Already Taken.';
  showPassword: boolean=false;
  showPassword2: boolean=false;
  ngOnInit(): void{

  }
  show(i:any){
    if(i==1){
      this.showPassword = !this.showPassword;
    }else{
      this.showPassword2=! this.showPassword2
    }
  }
  onSubmit() {
    if(this.registrationForm?.valid){
      const details= this.registrationForm.value;
    this.api.signup(details).subscribe((response:any)=>{
      this.errorMessage='';
      if(response){
        this.result=response;
        const accessToken= response.message.accessToken;
        const refreshToken= response.message.refreshToken;
        const time=(Date.now()/1000);
        localStorage.setItem(this.at,accessToken);
        localStorage.setItem(this.rt,refreshToken);
        localStorage.setItem(this.lt,String(time));
        this.shared.setUsername(details.username);
        this.router.navigate(['/posts']);
      }
    },(error)=>{
      this.errorMessage=this.errs;
    })
  }
}



}
