import { Observable } from "rxjs";
import { BookApi } from "../books/book/book";
import { ReservationApi } from "../reservations/reservation";
import { CustomerApi } from "../customers/customer";
/**
 * @konstantinosporo
 * @description
 * Interface representing CRUD actions and data streams for managing entities.
 * Moved into an interface, so it can help not forgetting the methods to implement.
 */
export interface CrudActions {
  data?: BookApi[] | ReservationApi[] | CustomerApi;
  dataStream$?: Observable<BookApi[] | ReservationApi[] | CustomerApi[]>;
  add: (route: string) => void;
  view: (id: string) => void;
  edit: (id: string) => void;
  delete: (id: string) => void;

}
