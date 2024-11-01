import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, forkJoin } from 'rxjs';

export interface ApiStatus {
  title: string;
  endpoint: string;
  status: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class HealthCheckService {
  private readonly apiUrl: string = 'https://book-api-bx2r.onrender.com';
  private readonly endpoints = [
    { title: 'Books API', endpoint: `${this.apiUrl}/books` },
    { title: 'Customers API', endpoint: `${this.apiUrl}/customers` },
    { title: 'Reservations API', endpoint: `${this.apiUrl}/reservations` }
  ];

  constructor(private readonly http: HttpClient) { }
  /**
   * @konstantinosporo
   * @description
   * Method that sends request to the api endpoints, and depending on the 
   * status (200,404) returns checks for each individual one.
   * @returns 
   */
  checkApiStatus(): Observable<ApiStatus[]> {
    const checks = this.endpoints.map(api =>
      this.http.get(api.endpoint, { observe: 'response' }).pipe(
        map(() => ({ title: api.title, endpoint: api.endpoint, status: true })), // Endpoint is online
        catchError(() => of({ title: api.title, endpoint: api.endpoint, status: false })) // Endpoint is offline
      )
    );
    return forkJoin(checks);
  }
}
