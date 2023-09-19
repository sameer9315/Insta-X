
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
  messageSend='message';

  socket = io('http://localhost:3003');


  socketEmitter(emitName:any,data:any){
    this.socket.emit(emitName,data);
  }

  public sendMessage(message: any) {
    // console.log('sendMessage: ', message);
    // this.socket.emit('message', message);
    this.socketEmitter(this.messageSend,message);
    
  }

 groupList='groupList';
 groupCreate='createGroup';
 groupJoin='joinGroup';
 usersJoined='userJoined';
 groupLeave='leaveGroup';
 leftUser='userLeft';
 conected='userConnected';
 usersActive='activeUsers';
 private='privateMessage';
 group='chatMessage';
 signout='logout';


  // getGroupMembers(groupName: string){

  //   this.socket.emit(this.getGroupMember,groupName);
  //   this.socket.on('groupMembers',(members:string[])=>{
  //     this.groupMembers=members;
  //     console.log(this.groupMembers);
  //   })
  // }
  

  getGroupList(callback:(groups:string[])=>void):void{
    this.socket.on(this.groupList,(groups: string[])=>{
      callback(groups);
    })
  }
  createGroup(groupName: string){
    this.socketEmitter(this.groupCreate,groupName);
  }

  joinGroup(data:any){
    this.socketEmitter(this.groupJoin,data);
  }
  onUserJoined():Observable<any>{
    return new Observable<any>((observer)=>{
      this.socket.on(this.usersJoined,(username: any)=>{
        observer.next(username);
        // console.log(username);
      })
    })
  }
  leave(data:any):void{
    this.socketEmitter(this.groupLeave,data);
  }
  onLeaveGroup():Observable<any>{
    return new Observable<any>((observer)=>{
      this.socket.on(this.leftUser,(username:any)=>{
        observer.next(username);
      })
    })
  }

  emitUserConnected(username:string){
    this.socketEmitter(this.conected,username);
  }

  getActiveUsers(callback:(users:string[])=>void):void{
    this.socket.on(this.usersActive,(users:string[])=>{
      callback(users);
    })
  }
  onPersonalMessage(): Subject<any>{
    this.socket.on(this.private,(message)=>{
      this.personalMessageSubject.next(message);
    })
    return this.personalMessageSubject;
  }

// ongroupChat(): Subject<any>{
//   // console.log('hellloooo groupchat');
//   this.socket.on('chatMessage',(message)=>{
//     // console.log('Recieved GroupMessage:', message);
//     this.groupMessageSubject.next(message);
//   })
//   return this.groupMessageSubject;
// }

  ongroupMessage(callback: (message:any)=>void):void{
    this.socket.on(this.group,(data)=>{
      callback(data);
    })
  }

  // onPrivateMessage(callback: (message:any)=>void):void{
  //   this.socket.on('privateMessage',(data)=>{
  //     callback(data);
  //   })
  // }

  logout(){
    this.socket.emit(this.signout);
  }
  public getNewMessage = () => {
    this.socket.on('private message', (message) =>{

      this.messages.next(message);
    });

    return this.messages.asObservable();
  };
}
