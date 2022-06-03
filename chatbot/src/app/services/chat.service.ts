/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  url: string = environment.production ? window.location.origin : 'http://localhost:5000';
  socket;
  count = 1;

  constructor() {
    this.socket = io(this.url);
  }

  //method to conect
  public socket_connect(user) {
    this.socket.connect();
    this.socket.emit('user-join', ({ user }));
  }

  //method to show all userconnected
  getOnlineUsers = () => new Observable((observable) => {
    this.socket.on('user-con', (users) => {
      observable.next(users);
    });
  });

  //method to get current messages
  getUsermessages(user) {
    this.socket.emit('get-msgs', { user });
  }

  //method to delete messages
  deletemessage(data) {
    this.socket.emit('delete-message', data);
  }

  //responds after the message is deleted
  getdeletedmessages = () => new Observable((observable) => {
    this.socket.on('message-deleted', (message) => {
      observable.next(message);
    });
  });

  //method to send a messages
  sendMessages = (from: string, to: string, message: string) => {
    this.socket.emit('send-message', ({ from, to, message }));
    // this.getAllChats();
  };

  //method to request users messagge

  //method to get personal messages
  getUsers_msg = (from: string, to: string) => {
    this.socket.emit('user-messages', ({ from, to }));
  };

  //method to get all messages
  getAllMsg() {
    return new Observable((observable) => {
      this.socket.on('allmessages', (allmsg) => {
        observable.next(allmsg);
      });
    });
  };

  //method to recieve users messages
  receiveUsermessages() {
    return new Observable((observable) => {
      this.socket.on('receive-msg', (message) => {
        observable.next(message);
      });
    });
  }

  //method to recieve messages
  recievemessages = () => new Observable((observable) => {
    this.socket.on('new-message', (message) => {
      observable.next(message);
    });
  });

  //get all chats
  getAllChats = () => new Observable((observable) => {
    this.socket.on('chats', (message) => {
      observable.next(message);
    });
  });

  //socket disconnect
  disconnect() {
    this.socket.disconnect();
  }

  join_group(data: any) {
    this.socket.emit('join-group', data);
  }

  leave_group(data: any) {
    this.socket.emit('leave-group', data);
  }

  get_all_groupmsg = () => new Observable((observable) => {
    this.socket.on('all-group-msg', (data) => {
      observable.next(data);
    });
  });

  getGroupmessage() {
    return new Observable((observable) => {
      this.socket.on('message', (message) => {
        observable.next(message);
        //console.log('message',message)
      });
    });
  };

  sendGroupmessage(data: any) {
    this.socket.emit('group-message', data);
  }

  req_unread_message(data: any) {
    this.socket.emit('req-unread-message', (data));
  }
  read_message(data: any) {
    this.socket.emit('update-all-unread-message', (data));
  }

  getUnreadMessage = () => new Observable((observable) => {
    this.socket.on('get-unread-message', (count) => {
      observable.next(count);
    });
  });
  /* end of socket io*/

}
