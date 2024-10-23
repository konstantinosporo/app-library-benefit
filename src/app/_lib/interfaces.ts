import { Observable } from "rxjs";
import { BookApi } from "../library/book/book";
import { ReservationApi } from "../reservations/reservation";
import { CustomerApi } from "../customers/customer";

export interface CrudActions {
  data?: BookApi[] | ReservationApi[] | CustomerApi
  dataStream$?: Observable<BookApi[] | ReservationApi[] | CustomerApi[]>;
  view: (id: string) => void;
  edit: (id: string) => void;
  delete: (id: string) => void;
  
}
//TODO Make a Service Interface that carries the same functions of books, customers, reservations!