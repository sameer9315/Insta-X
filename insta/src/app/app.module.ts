import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button'
import{MatFormFieldModule} from '@angular/material/form-field'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { SignupComponent } from './used/signup/signup.component';
import { HomeComponent } from './used/home/home.component';
import { SigninComponent } from './used/signin/signin.component';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './used/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { CreatePostComponent } from './used/create-post/create-post.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LikedbyComponent } from './used/likedby/likedby.component';
@NgModule({
  declarations: [
    AppComponent,
    // SignupComponent,
    HomeComponent,
    SigninComponent,
    RegisterComponent,
    CreatePostComponent,
    LikedbyComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([{path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {path: 'login', component: SigninComponent},
    {path: 'signup', component: RegisterComponent},
    {path: 'posts', component: HomeComponent}]),
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule,
    HttpClientModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
