import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerApi } from '../../customers/customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  // Available customers endpoint URL.
  private readonly customerApiUrl: string = "https://book-api-bx2r.onrender.com/customers";
  // Mock Api tests
  private readonly mockCustomerApiUrl: string = "https://66ee7c5b3ed5bb4d0bf10e97.mockapi.io/api/customers/";
  
  constructor(private readonly http: HttpClient) { }
  
   /**
   * @konstantinosporo
   * @description
   * Fetches all customers from the api endpoint.
   */
  getCustomers():Observable<CustomerApi[]> {
    return this.http.get<CustomerApi[]>(this.customerApiUrl);
  }
  // mock api test
  getMockCustomers(): Observable<CustomerApi[]>{
    return this.http.get<CustomerApi[]>(this.mockCustomerApiUrl);
  }
  deleteMockCustomer(id: string): Observable<any> {
    return this.http.delete(`${this.mockCustomerApiUrl}/${id}`);
  }

}
