
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup

  user: any = {
    'username' : '',
    'email' : '',
    'password' : '',
    'role': ['user']
  }

  constructor( private auth: AuthService, private router: Router, ) { }

  ngOnInit(): void {
  }


  register(form) {
    console.log(this.user);
    return this.auth.register(form.value).subscribe((response)=> {
      console.log(response);
      this.router.navigate(['/login'])

    })

  }
}
