import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private chat: ChatService) {
    const user = localStorage.getItem('username');
    this.chat.socket_connect(user);
  }

}
