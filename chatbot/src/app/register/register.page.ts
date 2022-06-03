import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup | any;
  constructor(private http: RegisterService, private fb: FormBuilder, private route: Router) { }

  register() {
    if(this.registerForm.value.password === this.registerForm.value.confirmPassword) {
      this.http.post('user/register', this.registerForm.value).subscribe((res: any) => {
        console.log(res.message);
        localStorage.setItem('username', res.username);
        this.route.navigate(['/chats']);
      });
    }
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required],
      confirmPassword: ['',Validators.required]
    });
  }

}
