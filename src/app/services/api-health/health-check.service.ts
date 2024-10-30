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
  private readonly endpoints = [
    { title: 'Books API', endpoint: 'https://book-api-bx2r.onrender.com/books' },
    { title: 'Customers API', endpoint: 'https://book-api-bx2r.onrender.com/customers' },
    { title: 'Reservations API', endpoint: 'https://book-api-bx2r.onrender.com/reservations' }
  ];

  constructor(private readonly http: HttpClient) { }

  // Check the status of each API endpoint
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
