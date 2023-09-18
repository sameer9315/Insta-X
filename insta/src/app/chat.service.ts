
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { Socket } from 'socket.io';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ChatService {

  public messages: any;
  constructor() {}
  groupMembers:string[]=[];
  private personalMessageSubject= new Subject<any>();
  private groupMessageSubject= new Subject<any>();


  socket = io('http://localhost:3003');

  public sendMessage(message: any) {
    console.log('sendMessage: ', message);
    this.socket.emit('message', message);
    
  }

  getGroupMembers(groupName: string){

    this.socket.emit('getGroupMembers',groupName);
    this.socket.on('groupMembers',(members:string[])=>{
      this.groupMembers=members;
      console.log(this.groupMembers);
    })
  }
  

  getGroupList(callback:(groups:string[])=>void):void{
    this.socket.on('groupList',(groups: string[])=>{
      callback(groups);
    })
  }
  createGroup(groupName: string){
    this.socket.emit('createGroup',groupName);
  }

  joinGroup(data:any){
    this.socket.emit('joinGroup',data);
  }
  onUserJoined():Observable<any>{
    return new Observable<any>((observer)=>{
      this.socket.on('userJoined',(username: any)=>{
        observer.next(username);
        console.log(username);
      })
    })
  }
  leave(data:any):void{
    this.socket.emit('leaveGroup',data);
  }
  onLeaveGroup():Observable<any>{
    return new Observable<any>((observer)=>{
      this.socket.on('userLeft',(username:any)=>{
        observer.next(username);
      })
    })
  }

  emitUserConnected(username:string){
    this.socket.emit('userConnected',username);
  }

  getActiveUsers(callback:(users:string[])=>void):void{
    this.socket.on('activeUsers',(users:string[])=>{
      callback(users);
    })
  }
  onPersonalMessage(): Subject<any>{
    console.log('Helllo personal  essage recived');
    this.socket.on('privateMessage',(message)=>{
      this.personalMessageSubject.next(message);
    })
    return this.personalMessageSubject;
  }

ongroupChat(): Subject<any>{
  // console.log('hellloooo groupchat');
  this.socket.on('chatMessage',(message)=>{
    // console.log('Recieved GroupMessage:', message);
    this.groupMessageSubject.next(message);
  })
  return this.groupMessageSubject;
}

  ongroupMessage(callback: (message:any)=>void):void{
    console.log('group Messages');
    console.log(this.socket.on('chatMessage',(data)=>{
      
    }))
    this.socket.on('chatMessage',(data)=>{
      console.log(data);
      callback(data);
    })
  }

  onPrivateMessage(callback: (message:any)=>void):void{
    console.log('hello private');
    this.socket.on('privateMessage',(data)=>{
      console.log('Recieved: ', data);
      callback(data);
    })
  }

  logout(){
    this.socket.emit('logout');
  }
  public getNewMessage = () => {
    this.socket.on('private message', (message) =>{

      this.messages.next(message);
    });

    return this.messages.asObservable();
  };
}
