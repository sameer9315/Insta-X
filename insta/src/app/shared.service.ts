import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  user: any='';
  constructor() { }

  setUsername( username: any){
    this.user=username;
  }
  getUsername(){
    return this.user;
  }
}
