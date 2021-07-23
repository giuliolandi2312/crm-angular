import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiPath = environment.apiPath;

  httpOptions = {
    headers: new HttpHeaders().set(
      'X-TENANT-ID','fe_0221'

    )
  }

  constructor(private http: HttpClient, private router: Router) { }


  login(user) {
    return this.http.post<any>(this.apiPath + 'auth/login',user, this.httpOptions);
  }

  register(user) {
    return this.http.post<any>(this.apiPath + 'auth/signup',user, this.httpOptions);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/'])
  }
  
  get isLogged():boolean{
    if(localStorage.getItem('currentUser') !== null){
    let accessToken = JSON.parse(localStorage.getItem('currentUser')).accessToken;
    return true;
    } else {
      return false;
    }
  }
  get currentUser():any{
    return JSON.parse(localStorage.getItem('currentUser'));
  }
}


