import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  toppings =  new FormControl()
  public isCollapsed = false;

  toppingList:string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  constructor(private router: Router, private route: ActivatedRoute) { }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login'])
  }

  ngOnInit(): void {
  }

}
