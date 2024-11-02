import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ReservationApi } from '../../reservations/reservation';
import { HeatMapData } from './charts';

@Injectable({
  providedIn: 'root'
})
export class ReservationHttpService {
  // Available reservations endpoint URL.
  public readonly reservationApiUrl: string = "https://book-api-bx2r.onrender.com/reservations";

  constructor(private readonly http: HttpClient) { }

  /**
  * @konstantinosporo
  * @description
  * Fetches all reservations from the api endpoint.
  */
  getReservations(): Observable<ReservationApi[]> {
    return this.http.get<ReservationApi[]>(this.reservationApiUrl);
  }
  getReservationById(id: string): Observable<ReservationApi> {
    return this.http.get<ReservationApi>(`${this.reservationApiUrl}/${id}`);
  }
  addReservation(newReservation: ReservationApi): Observable<ReservationApi> {
    return this.http.post<ReservationApi>(this.reservationApiUrl, newReservation);
  }
  completeReservation(id: ReservationApi['_id']): Observable<ReservationApi> {
    return this.http.post<ReservationApi>(`${this.reservationApiUrl}/${id}/complete`, {});
  }
  /**
   * @konstantinosporo
   * @description
   * Custom methods to aggregate data (combine stats) for charts
   */
  getReservationsByDay(): Observable<HeatMapData> {
    return this.getReservations().pipe(
      map((reservations) => {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const counts = Array(7).fill(0); // count for each day of the week

        reservations.forEach((reservation) => {
          const date = new Date(reservation?.reservedOn ?? '');
          const day = date.getDay(); // get the day of the week [0-6]
          counts[day]++; // increment count
        });

        return {
          days: daysOfWeek,
          counts: counts,
        };
      })
    );
  }

}
