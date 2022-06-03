import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  name: any;
  message: any;
  allmessages: any;
  currentuser = localStorage.getItem('username').toString();
  constructor(private act: ActivatedRoute, private chat: ChatService) {
    this.name = this.act.snapshot.params.id;
    this.chat.read_message({ from: name, to: this.currentuser });
    this.chat.getUsers_msg(this.currentuser, this.name);
  }

  ngOnInit() {

    this.chat.receiveUsermessages().subscribe((messages: any[]) => {
      // console.log(messages);
      this.allmessages = messages;
    });

    this.chat.recievemessages().subscribe((messages: any) => {
      // console.log(messages);
      this.chat.getUsermessages(this.currentuser);
      if (messages.from === this.name) {
        this.allmessages.push(messages);
      }
    });

  }

  ionViewWillEnter() {
    // This method will be called every time the component is navigated to
    // On initialization, both ngOnInit and this method will be called


  }

  back() {
    this.chat.getUsermessages(this.currentuser);
  }

  sendMessage() {
    if (!!this.message) {
      this.chat.sendMessages(this.currentuser, this.name, this.message);
      this.allmessages.push({ from: this.currentuser, to: this.name, message: this.message, time: new Date(), read: false });
      this.message = '';
    }
  }

}
