import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;
  @Input() users: any[] = [
    { username: 'fake user 1', message: 'hello world', latestdate: new Date(), status: 'online' },
    { username: 'fake user 2', message: 'hello world', latestdate: new Date(), status: 'online' },
    { username: 'fake user 3', message: 'hello world', latestdate: new Date(), status: 'online' },
    { username: 'fake user 4', message: 'hello world', latestdate: new Date(), status: 'online' },
    { username: 'fake user 5', message: 'hello world', latestdate: new Date(), status: 'online' },
    { username: 'fake user 6', message: 'hello world', latestdate: new Date(), status: 'online' },
    { username: 'fake user 7', message: 'hello world', latestdate: new Date(), status: 'online' },
    { username: 'fake user 8', message: 'hello world', latestdate: new Date(), status: 'online' },
    { username: 'fake user 9', message: 'hello world', latestdate: new Date(), status: 'online' },
  ];
  onlineusers = [];

  constructor(private router: Router) { }

  navigate(name: string) {
    this.router.navigate(['/messages', name]);
  }

  checkOnlineUsers(username) {
    //console.log(this.onlineusers);
    const user = this.onlineusers.find(data => data.username === username);
    if (!!user) {
      return '#02f553ee';
    } else {
      return '#ff0946';
    }
  }

  ngOnInit() { }

}
