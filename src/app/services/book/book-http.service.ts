import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { BookApi } from '../../books/book/book';

@Injectable({
  providedIn: 'root'
})
export class BookHttpService {
  // Available books endpoint URL.
  private readonly bookApiUrl: string = "https://book-api-bx2r.onrender.com/books";

  constructor(private readonly http: HttpClient) { }

  /**
   * @konstantinosporo
   * @description
   * Fetches all books from the api endpoint.
   */
  getBooks(): Observable<BookApi[]> {
    return this.http.get<BookApi[]>(this.bookApiUrl);
  }
  getBookById(id: string): Observable<BookApi> {
    return this.http.get<BookApi>(`${this.bookApiUrl}/${id}`);
  }
  getBookNameById(id: string): Observable<(BookApi["name"] | undefined)> {
    return this.http.get<BookApi[]>(this.bookApiUrl).pipe(map(books => {
      const book = books.find(book => book._id === id);
      return book ? book.name : undefined;
    }));
  }
  getAllBookIds(): Observable<(BookApi["_id"] | undefined)[]> {
    return this.http.get<BookApi[]>(this.bookApiUrl).pipe(map(books => books.map(book => book._id)));
  }
  getAvailableBookIds(): Observable<(BookApi["_id"] | undefined)[]> {
    return this.http.get<BookApi[]>(this.bookApiUrl).pipe(
      map(books =>
        books
          .filter(book => book.available !== false) // Filter out unavailable books
          .map(book => book._id)
      )
    );
  }
  /**
   * @konstantinosporo
   * @description
   * Returns the count of available books grouped by type.
   */
  getAvailableBooksCountByType(): Observable<{ value: number, type: string }[]> {
    return this.http.get<BookApi[]>(this.bookApiUrl).pipe(
      map(books => {
        const bookTypeCounts: { [key: string]: number } = {};

        books.forEach(book => {
          if (book.available !== false && book.type) {
            bookTypeCounts[book.type] = (bookTypeCounts[book.type] || 0) + 1;
          }
        });

        const result = Object.entries(bookTypeCounts).map(([type, value]) => ({ value, type }));
        console.log("Mapped result:", result);  // This should log the transformed result
        return result;
      }),
      // Log any errors that occur
      catchError(err => {
        console.error("Error in getAvailableBooksCountByType:", err);
        return of([]);  // Return an empty array on error
      })
    );
  }


  addBook(newBook: BookApi): Observable<BookApi> {
    return this.http.post<BookApi>(this.bookApiUrl, newBook);
  }
  editBook(editedBook: BookApi): Observable<BookApi> {
    //console.log(editedBook);
    return this.http.put<BookApi>(`${this.bookApiUrl}/${editedBook._id}`, editedBook);
  }
  deleteBookById(id: string): Observable<BookApi> {
    //console.log(`Deleting book with URL: ${this.bookApiUrl}/${id}`); // Log the URL
    return this.http.delete<BookApi>(`${this.bookApiUrl}/${id}`);
  }

}
