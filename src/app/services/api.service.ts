import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  users:any;
  lastId = 1;

  apiPath = environment.apiPath;

  constructor(private http:HttpClient) { }

  
  
  getUserList(page, size) {
    console.log(page)
    page = page  -1
    return this.http.get<any>(this.apiPath + 'users?page=' + page + '&size=' + size ).pipe(
      catchError(this.handleError))
  }
  
 
 
  getCustomerList(page, size,id:any,  sort){
    page = page -1
    return this.http.get<any>(this.apiPath + 'clienti?page=' + page + '&size=' +  size + '&sort=' + sort).pipe(
      catchError(this.handleError))
  }
  
  
  
  getInvoiceList(page, size,id:any,  sort){
    page = page -1
    return this.http.get<any>(this.apiPath + 'fatture?page=' + page + '&size=' + size + '&sort=' + sort).pipe(
      catchError(this.handleError))
  }
  /*getInvoiceCustomerList(page,size, id:any, sort){
    page = page - 1;
    return this.http.get<any>(this.apiPath + 'fatture/cliente/'+ id + '?page=' + page + '&size=' + size + '&sort='+ sort).pipe(
      catchError(this.handleError));
  } */

  
  
  getInvoiceDetail(id:any){
    console.log(id)
    return this.http.get<any>(this.apiPath + 'fatture/' + id).pipe(
      catchError(this.handleError))
  }

  
  
  updateInvoice(id:any,invoice){
    return this.http.put<any>(this.apiPath + 'fatture/' + id,invoice).pipe(
      catchError(this.handleError))
  }

  
  
  createInvoice(invoice){
    return this.http.post<any>(this.apiPath + 'fatture' ,invoice).pipe(
      catchError(this.handleError))
  }
  
  
  
  getCustomerDetail(id:any){
    console.log(id)
    return this.http.get<any>(this.apiPath + 'clienti/' + id).pipe(
      catchError(this.handleError))
  }

  
  
  updateCustomer(id:any,customer){
    return this.http.put<any>(this.apiPath + 'clienti/' + id,customer).pipe(
      catchError(this.handleError))
  }
  
  
  getInvoiceCustomerList(page, size,id:any,sort){
    page = page -1
    return this.http.get<any>(this.apiPath + 'fatture/cliente/'+ id + '?page=' + page + '&size=' + size + '&sort='+ sort).pipe(
      catchError(this.handleError))
  }
 
 
  getListaComuni(){
    return this.http.get<any>(this.apiPath + 'comuni').pipe(
      catchError(this.handleError))
  }
  
  
  getTipiCliente(){
    return this.http.get<any>(this.apiPath + 'clienti/tipicliente').pipe(
      catchError(this.handleError))
  }
 
 
  createCustomer(customer){
    return this.http.post<any>(this.apiPath + 'clienti', customer).pipe(
      catchError(this.handleError))
  }
 
 
  deleteInvoice(id:any) {
   return this.http.delete<any>(this.apiPath + 'fatture/' + id).pipe(
    catchError(this.handleError))
 } 
 
 
  deleteCustomer(id:any) {
    return this.http.delete<any>(this.apiPath + 'clienti/' + id).pipe(
      catchError(this.handleError))
  } 
  
  deleteCustomerInvoice(id:any) {
  return this.http.delete<any>(this.apiPath + 'fatture/cliente' + id).pipe(
    catchError(this.handleError))
}

private handleError(error:any){
  if(error.status === 0) {
    console.log('something went wrong:', error.error)
  } else {
    console.log(
      `backend returned code ${error.status},` + 
      `message was : ${error.message}`
    );
  } 
  return throwError(error);
  };
}

