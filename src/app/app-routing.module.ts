import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from '././services/auth-guard.guard';
import { CustomerCreateComponent } from './customers/customer-create/customer-create.component';
import { CustomerDetailComponent } from './customers/customer-detail/customer-detail.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { ErrorComponent } from './error/error.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CreateInvoiceComponent } from './invoices/create-invoice/create-invoice.component';
import { FattureClientiComponent } from './invoices/invoices-customers/invoices-customers.component';
import { InvoicesDetailComponent } from './invoices/invoices-detail/invoices-detail.component';
import { InvoicesListComponent } from './invoices/invoices-list/invoices-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserListComponent } from './users/user-list/user-list.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'user', component: UserListComponent, canActivate: [AuthGuardGuard]},
  {path: 'customer', component: CustomerListComponent, canActivate: [AuthGuardGuard]},
  {path: 'customer/create/:id', component: CustomerCreateComponent},
  {path: 'customer/:id', component:CustomerDetailComponent},
  {path: 'invoice', component: InvoicesListComponent, canActivate: [AuthGuardGuard]},
  {path: 'invoice/create/:id', component: CreateInvoiceComponent},
  {path: 'invoice/customer/:id', component: FattureClientiComponent},
  {path: 'invoice/:id', component: InvoicesDetailComponent, canActivate: [AuthGuardGuard]},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
