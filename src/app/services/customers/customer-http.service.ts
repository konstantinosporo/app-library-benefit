import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerApi } from '../../customers/customer';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerHttpService {
  // Available customers endpoint URL.
  private readonly customerApiUrl: string = "https://book-api-bx2r.onrender.com/customers";
  // Mock Api tests
  //private readonly mockCustomerApiUrl: string = "https://66ee7c5b3ed5bb4d0bf10e97.mockapi.io/api/customers/";

  constructor(private readonly http: HttpClient) { }

  /**
  * @konstantinosporo
  * @description
  * Fetches all customers from the api endpoint.
  */
  getCustomers(): Observable<CustomerApi[]> {
    return this.http.get<CustomerApi[]>(this.customerApiUrl);
  }
  getCustomerById(id: string): Observable<CustomerApi> {
    return this.http.get<CustomerApi>(`${this.customerApiUrl}/${id}`);
  }
  getAllCustomerIds(): Observable<(CustomerApi["_id"] | undefined)[]> {
    return this.http.get<CustomerApi[]>(this.customerApiUrl).pipe(map(customers => customers.map(customer => customer._id)));
  }
  addCustomer(newCustomer: CustomerApi): Observable<CustomerApi> {
    return this.http.post<CustomerApi>(this.customerApiUrl, newCustomer);
  }
  editCustomer(editedCustomer: CustomerApi): Observable<CustomerApi> {
    //console.log(editedCustomer)
    return this.http.put<CustomerApi>(`${this.customerApiUrl}/${editedCustomer._id}`, editedCustomer);
  }
  deleteCustomerById(id: string): Observable<any> {
    return this.http.delete(`${this.customerApiUrl}/${id}`);
  }
  // MOCK API ENDPOINT METHODS
  // getMockCustomers(): Observable<CustomerApi[]> {
  //   return this.http.get<CustomerApi[]>(this.mockCustomerApiUrl);
  // }
  // deleteMockCustomer(id: string): Observable<any> {
  //   return this.http.delete(`${this.mockCustomerApiUrl}/${id}`);
  // }

}
