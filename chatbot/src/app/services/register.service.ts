import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url: string = environment.production ? window.location.origin + '/' : 'http://localhost:5000/';

  constructor(private http: HttpClient) { }

  post(path: string, data: any) {
    // this.manager.clear();
    return this.http.post(`${this.url}${path}`, data);
  }

  get(path: string) {
    return this.http.get(`${this.url}${path}`);
  }
}
