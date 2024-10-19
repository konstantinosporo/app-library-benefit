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
  
  constructor(private readonly http: HttpClient) { }
  
   /**
   * @konstantinosporo
   * @description
   * Fetches all customers from the api endpoint.
   */
  getReservations():Observable<CustomerApi[]> {
    return this.http.get<CustomerApi[]>(this.customerApiUrl);
  }
}
