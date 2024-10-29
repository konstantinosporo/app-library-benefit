import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReservationApi } from '../../reservations/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationHttpService {
  // Available reservations endpoint URL.
  private readonly reservationApiUrl: string = "https://book-api-bx2r.onrender.com/reservations";

  constructor(private readonly http: HttpClient) { }

  /**
  * @konstantinosporo
  * @description
  * Fetches all reservations from the api endpoint.
  */
  getReservations(): Observable<ReservationApi[]> {
    return this.http.get<ReservationApi[]>(this.reservationApiUrl);
  }
  addReservation(newReservation: ReservationApi): Observable<ReservationApi> {
    return this.http.post<ReservationApi>(this.reservationApiUrl, newReservation);
  }
  completeReservation(id: ReservationApi['_id']): Observable<ReservationApi> {
    return this.http.post<ReservationApi>(`${this.reservationApiUrl}/${id}/complete`, {});
  }
}
