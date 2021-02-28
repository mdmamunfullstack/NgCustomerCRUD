import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { Customer } from './customer.model';
const baseURL = 'https://localhost:44380/api/customers'

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  selectedCustomer:Customer;
  CustomerList :Observable<Customer[]>;

  constructor(private httpClient:HttpClient) { 
  }

  getCustomerList():Observable<Customer[]> {
    this.CustomerList = this.httpClient.get<Customer[]>(baseURL);
    return this.CustomerList;
  }

  getCustomerById(id):Observable<any>{
    return this.httpClient.get(`${baseURL}/${id}`);
  }

  addCustomer(customer):Observable<any>{
    return this.httpClient.post(baseURL, customer)
  }

  updateCustomer(id, data):Observable<any>{
    return this.httpClient.put(`${baseURL}/${id}`,data);
  }

  deleteCustomer(id):Observable<any>{
    return this.httpClient.delete(`${baseURL}/${id}`);
  }

  deleteAllCustomer():Observable<any>{
    return this.httpClient.delete(baseURL);
  }

  searchByCustomer(name):Observable<any>{
    return this.httpClient.get(`${baseURL}?name=${name}`);
  }

    





}
