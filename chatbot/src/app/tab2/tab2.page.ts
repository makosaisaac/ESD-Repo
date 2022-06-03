import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  allusers = [];
  currentuser = localStorage.getItem('username');
  constructor(private http: RegisterService) { }


  ngOnInit() {
    this.http.get('user/allusers').subscribe((res: any) => {
      this.allusers = res;
      console.log(res);
    });
  }

}
