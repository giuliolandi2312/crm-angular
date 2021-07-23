import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hidden: false
  user:any = {
    'username': '',
    'password': ''
  }

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.user);
    this.auth.login(this.user).subscribe((response)=>{
      console.log(response);
      localStorage.setItem('currentUser', JSON.stringify(response));
      this.router.navigate(['/customer']);
    })

  }
  


}
