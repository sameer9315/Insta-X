import { Component,OnInit ,ChangeDetectorRef,NgZone, HostListener} from '@angular/core';
// import * as io from 'socket.io-client'
import { ChatService } from '../../chat.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { SharedService } from 'src/app/shared.service';
import { Subscription } from 'rxjs';
import { response } from 'express';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent  {
  us='username';
  newMessage= '';
  messageList: any[] = [];
  username: any='';
  activeUsers: string[]=[];
  selectedRecipientSocketId:string='';
  selectedRecipient:string='';
  groupList: string[]=[];
  groupName: string='';
  selectedGroup: string='';
  groupChatMessages:any[]=[];
  joinedGroups: string[]=[];
  joinedGroup:string='';
  selectedGroupMembers: string[]=[];
  allGroupDetails: any[]=[];

  
 private userJoinedSubscription: Subscription | undefined;
  private userleftSubscription: Subscription | undefined;
  // messageSubscription: Subscription | undefined;


  constructor(private chatService: ChatService,private router: Router,private api: ApiService, private shared: SharedService){
    this.chatService.emitUserConnected(String(localStorage.getItem(this.us)));
    this.chatService.getActiveUsers((users:string[])=>{
      this.activeUsers=users.filter(user=>user!==localStorage.getItem(this.us));
      console.log(users);
    });
    // this.chatService.getGroupList((groups:string[])=>{
    //   this.groupList=groups;
    //   console.log(this.groupList);
    // })
    
    this.api.getGroups().subscribe((response:any)=>{
      this.allGroupDetails=response;
      response.message.forEach((group:any) => {
        this.groupList.push(group.groupName);
        if(group.members.includes(this.username)){
          this.joinedGroups.push(group.groupName);
        }
      });
      console.log(response);
     },(error)=>{
      this.api.logout();
      this.router.navigate(['/login']);
    });

  }

  ngOnInit():void {

    if(!localStorage.getItem(this.us)){
    this.api.logout();
    this.router.navigate(['/login']);
    }else{
      this.username=localStorage.getItem(this.us);
      this.chatService.onPersonalMessage().subscribe((message)=>{
          this.messageList.push(message);

      })
    // this.subscribeToGroupMessage();

      // this.chatService.ongroupChat().subscribe((message)=>{
      //   console.log('HEllllooooo group')
      //   this.groupChatMessages.push(message);
      //   console.log(this.groupChatMessages);

      // })
      // this.chatService.onPrivateMessage((message)=>{
      //   console.log('hlo personl msgl');
      //     this.messageList.push(message);
      // });
      this.chatService.ongroupMessage((message)=>{
        this.groupChatMessages.push(message);
      });
      
      this.subscribeToUserJoined();
      this.subscribeToUserLeft();
    }

  }

  // subscribeToGroupMessage(){
  //   console.log('subscribesddddd')
  //   this.chatService.ongroupMessage((message)=>{
  //     this.groupChatMessages.push(message);
  //     console.log('Message Helllo Geoup', this.groupChatMessages);
  //   })
  // }



  // @HostListener('scroll',['$event'])
  // onScroll(event: Event){
  //   const chatWindow=event.target as HTMLElement;
  //   this.scrollToTop=chatWindow.scrollTop===0;
  // }

  // loadOlderMessage(){
  //   this.totalDisplayMessages+=this.messageChunkSize;
  // }

  groupMembersView(){
    if(this.selectedGroup){
      console.log(this.selectedGroup);
      console.log(this.selectedGroupMembers)
    }
  }

  ngOnDestroy():void{
    if(this.userJoinedSubscription){
      this.userJoinedSubscription.unsubscribe();

    }
    if(this.userleftSubscription){
      this.userleftSubscription.unsubscribe();

    }
  }
  subscribeToUserJoined():void{
    this.userJoinedSubscription=this.chatService.onUserJoined().subscribe((data:any)=>{
      if(data.groupName){
        this.groupChatMessages.push({
          type: 'notification',
          sender: this.username,
          groupName: data.groupName,
          Message : 'Joined The Group',
        });
        if(!this.joinedGroups.includes(data.groupName)){
          this.joinedGroups.push(data.groupName);
        }
      }
    })
  }
  subscribeToUserLeft():void{
    this.userleftSubscription=this.chatService.onLeaveGroup().subscribe((data:any)=>{
          this.groupChatMessages.push({
            type: 'notification',
          sender: this.username,
          groupName: data.groupName,
          Message : 'Left The Group',
          })
      })
  }
  createGroup(){
    if(this.groupName){
    this.chatService.createGroup(this.groupName);
    }
    this.groupName='';
  }
  groupChat(groupName:any){
    this.groupChatMessages=[];
    this.messageList=[];
    this.selectedGroup=groupName;
    this.groupName=groupName;
    this.selectedRecipientSocketId='';
    const recipient={
      groupName
    }
    this.api.getchats(recipient).subscribe((response:any)=>{
      response.message.forEach((message:any) => {
        this.groupChatMessages.push(message);
      });
      // console.log(response);
    })
    // this.chatService.getGroupMembers(groupName);
    // console.log(this.chatService.getGroupMembers(groupName))

  }
  groupJoinedChecker(groupName:any){
    return this.joinedGroups.includes(groupName);
  }
  joinGroup(groupName: string){
    this.joinedGroup=groupName;
    this.joinedGroups.push(groupName);
      this.chatService.joinGroup({groupName,username:this.username});
      // this.chatService.getGroupMembers(groupName);
  }
  leaveGroup(){
    if(this.selectedGroup){
    if(window.confirm(`Are You sure you want to Leave ${this.selectedGroup} Group`)){
      // console.log('removed');
      const data={
        groupName: this.selectedGroup,
        username: this.username,
      }
      this.chatService.leave(data);
      const index=this.joinedGroups.indexOf(this.selectedGroup);
      this.joinedGroups.splice(index,1);
      // this.chatService.onLeaveGroup().subscribe((data:any)=>{
      //   console.log(data);
      // })
      this.selectedGroup='';
    }

    }
  }

  getpersonalChat(): any {
    return this.messageList.filter(message=>
      (message.sender==this.selectedRecipientSocketId && message.receiver==this.username)||
      (message.sender==this.username && message.receiver==this.selectedRecipientSocketId)
    )
  }

  selectRecipient(recipientSocketId: string){
    this.selectedGroup='';
    this.groupChatMessages=[];
    this.messageList=[];
    const recipient={
      receiver: recipientSocketId,
    }
    this.api.getchats(recipient).subscribe((response:any)=>{
      response.message.forEach((message: any)=>{
        this.messageList.push(message);
      })
      console.log(response);
      console.log(this.messageList);
    });
    this.selectedRecipientSocketId=recipientSocketId;
  }
  sendMessage() {
    if(this.selectedRecipientSocketId && this.newMessage){
      this.selectedGroup='';
      this.chatService.sendMessage({
        sender: this.username,
        recipientSocketId: this.selectedRecipientSocketId,
        message: this.newMessage,
      })
      this.messageList.push({
        sender: localStorage.getItem(this.us),
        message: this.newMessage,
        reciever: this.selectedRecipientSocketId,
      });
      console.log(this.messageList);
    }else{
      this.chatService.sendMessage({
        groupName: this.groupName,
        message: this.newMessage,
        sender: localStorage.getItem(this.us)
      })
      // this.groupChatMessages.push({
      //   sender: localStorage.getItem(this.us),
      //   message: this.newMessage,
      //   groupName: this.groupName
      // })
    }
    console.log(this.groupChatMessages);
    this.newMessage = '';
  }
  logout(){
    this.chatService.logout();
    this.api.logout();

    this.router.navigate(['/login']);
  }
}


// const message={

// }
// this.chatService.sendMessage(message);
// this.selectedGroup=groupName;
    // this.selectedRecipientSocketId='';
    // this.chatService.getGroupMembers(groupName).subscribe({next:(members:any)=>{
    //   this.groupMembers=members;
    // },error:(error)=>{

    // };

    // scrollToTop=false;
    // messageChunkSize=20;
    // totalDisplayMessages=this.messageChunkSize;
    // });
    // console.log()
    // this.groupName=groupName;
    // let checked=false;
    // console.log(groupName,this.username,"grp Joined");
    // if(groupName){
      //   this.chatService.onUserJoined().subscribe((data:any)=>{
    //     console.log('hllllooooo')
    //     const avl={
    //       noti: data.username,
    //       group: data.groupName,
    //     }
    //     if(!this.joinedGroups.includes(groupName) && !this.groupChatMessages.includes(avl) ){
    //       console.log('pushiinh');
    //       console.log(checked);
    //       if(!checked){
    //       this.groupChatMessages.push({
    //         noti: data.username,
    //         group: groupName,

    //       });}
    //       checked=true;
    //       this.joinedGroups.push(groupName);
    //     }
    //     else if(!this.groupChatMessages.some(obj=>
    //       {obj.group === data.groupName && obj.noti===data.username} ) ){
    //       if(data.groupName===this.selectedGroup){
    //       console.log('pushiinh');
    //       console.log(this.groupChatMessages);
    //       this.groupChatMessages.push({
    //         noti:data.username,
    //         group:groupName,
    //       });
    //     }
    //   }
    //   checked=false;
    // })
    // }
