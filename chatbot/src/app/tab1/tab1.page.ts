import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  user: string = localStorage.getItem('username').toString();
  chats: any;
  constructor(private chat: ChatService) {
    // this.chat.getUsermessages(this.user);
  }

  ionViewWillEnter() {
    this.chat.getAllChats().subscribe((data: any) => {
      this.chats = data;
      // console.log(this.chats);
    });
  }
}
