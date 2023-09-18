import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularMaterialModule } from './angular-material.module';
import { MatInputModule } from '@angular/material/input';
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
import { UserPostComponent } from './used/user-post/user-post.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import { ChatComponent } from './used/chat/chat.component';
@NgModule({
  declarations: [
    AppComponent,
    // SignupComponent,
    HomeComponent,
    SigninComponent,
    RegisterComponent,
    CreatePostComponent,
    LikedbyComponent,
    UserPostComponent,ChatComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([{path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {path: 'login', component: SigninComponent},
    {path: 'signup', component: RegisterComponent},
    {path: 'posts', component: HomeComponent},
    {path: 'user', component:UserPostComponent},
    {path:'chat',component: ChatComponent},
  ]),
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule,
    HttpClientModule,
    MatDialogModule,FlexLayoutModule,AngularMaterialModule,MatInputModule,MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
