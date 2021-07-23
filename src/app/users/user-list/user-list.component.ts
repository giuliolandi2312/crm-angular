import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';


const FILTER_PAG_REGEX = /[^0-9]/g; 

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[]=[]
  message: string;
  errors = false;
  page = 1;
  pageSize = 10;
  collectionSize = 0;


  constructor(private api: ApiService, private router: Router, private auth: AuthService) { }


  getAllUsers(){
    return this.api.getUserList(this.page, this.pageSize).subscribe((response:any) => {
        console.log(response);
        response.content.forEach((value)=>{
          let ruoli:string =""
          value.roles.forEach((val)=>{
            ruoli += ' '+val.roleName
          })
          value.roles = ruoli
        })
        this.users = response.content                  // [...this.api.users, ...response.data];  // concateto l'array users con l'api
        this.collectionSize = response.totalElements;
      },
      (error:any) => {
        console.log('Errore dal component', error.message);
        this.errors = true;
        this.message = 'OOOPS!!! Something went wrong'
        setTimeout(()=>this.router.navigate(['/']),5000);
      }
    );
  }


  selectPage(page: string) {
    this.page = parseInt(page, 10) || 1;
    this.getAllUsers();
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }

  /*getAllCustomers() {
    return this.api.getCustomerList(this.page,this.pageSize).subscribe(
      (response:any) => {
        this.users = response.content;
        this.collectionSize = response.totalElements
   
      },
      (error: any) => {
        console.log('Errore dal component', error.message);
        this.errors = true;
        this.message = 'Ooops, qualcosa è andato storto!'
        setTimeout(()=> this.router.navigate(['/']), 5000)
      });
  } */

  ngOnInit(): void {
    this.getAllUsers();

  }

  logout() {
    this.auth.logout();
  }


}
