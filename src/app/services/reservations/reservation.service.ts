import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReservationApi } from '../../reservations/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
    // Available books endpoint URL.
  private readonly reservationApiUrl: string = "https://book-api-bx2r.onrender.com/reservations";
  
  constructor(private readonly http: HttpClient) { }
  
   /**
   * @konstantinosporo
   * @description
   * Fetches all books from the api endpoint.
   */
  getReservations():Observable<ReservationApi[]> {
    return this.http.get<ReservationApi[]>(this.reservationApiUrl);
  }
}
