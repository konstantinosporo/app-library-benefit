import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { BookApi } from '../../books/book/book';

@Injectable({
  providedIn: 'root'
})
export class BookHttpService {
  // Available books endpoint URL.
  public readonly bookApiUrl: string = "https://book-api-bx2r.onrender.com/books";

  constructor(private readonly http: HttpClient) { }

  /**
   * @konstantinosporo
   * @description
   * Fetches all books from the api endpoint.
   */
  getBooks(): Observable<BookApi[]> {
    return this.http.get<BookApi[]>(this.bookApiUrl);
  }
  /**
   * @konstantinosporo
   * @description
   * Fetches a book by its ID.
   * @param id - The ID of the book to fetch.
   * @returns An observable of the book with the specified ID.
   */
  getBookById(id: string): Observable<BookApi> {
    return this.http.get<BookApi>(`${this.bookApiUrl}/${id}`);
  }
  /**
   * @konstantinosporo
   * @description
   * Fetches the name of a book by its ID.
   * @param id - The ID of the book.
   * @returns An observable of the book name or undefined if not found.
   */
  getBookNameById(id: string): Observable<(BookApi["name"] | undefined)> {
    return this.http.get<BookApi[]>(this.bookApiUrl).pipe(map(books => {
      const book = books.find(book => book._id === id);
      return book ? book.name : undefined;
    }));
  }
  /**
   * @konstantinosporo
   * @description
   * Fetches the name of a book by its ID.
   * @param id - The ID of the book.
   * @returns An observable of the book name or undefined if not found.
   */
  getBookIdByName(bookName: string): Observable<(BookApi["_id"] | undefined)> {
    return this.http.get<BookApi[]>(this.bookApiUrl).pipe(map(books => {
      const book = books.find(book => book.name === bookName);
      return book ? book._id : undefined;
    }));
  }
  /**
   * @konstantinosporo
   * @description
   * Retrieves all book IDs from the API.
   * @returns An observable of an array containing the IDs of all books.
   */
  getAllBookIds(): Observable<(BookApi["_id"] | undefined)[]> {
    return this.http.get<BookApi[]>(this.bookApiUrl).pipe(map(books => books.map(book => book._id)));
  }
  /**
   * @konstantinosporo
   * @description
   * Retrieves available books from the API.
   * @returns An observable of an array containing the IDs of available books.
   */
  getAvailableBooks(): Observable<(BookApi | undefined)[]> {
    return this.http.get<BookApi[]>(this.bookApiUrl).pipe(
      map(books =>
        books
          .filter(book => book.available !== false) // Filter out unavailable books
      )
    );
  }
  /**
   * @konstantinosporo
   * @description
   * Retrieves the IDs of available books from the API.
   * @returns An observable of an array containing the IDs of available books.
   */
  getAvailableBookIds(): Observable<(BookApi["_id"] | undefined)[]> {
    return this.http.get<BookApi[]>(this.bookApiUrl).pipe(
      map(books =>
        books
          .filter(book => book.available !== false) // Filter out unavailable books
          .map(book => book._id) // Map the books to return only the ids.
      )
    );
  }
  /**
   * @konstantinosporo
   * @description
   * Returns the count of available books grouped by type.
   * @returns An observable of an array containing the count and type of available books.
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
  /**
   * @konstantinosporo
   * @description
   * Adds a new book to the API.
   * @param newBook - The book to be added.
   * @returns An observable of the added book.
   */
  addBook(newBook: BookApi): Observable<BookApi> {
    return this.http.post<BookApi>(this.bookApiUrl, newBook);
  }
  /**
   * @konstantinosporo
   * @description
   * Edits an existing book in the API.
   * @param editedBook - The book with updated data.
   * @returns An observable of the updated book.
   */
  editBook(editedBook: BookApi): Observable<BookApi> {
    return this.http.put<BookApi>(`${this.bookApiUrl}/${editedBook._id}`, editedBook);
  }
  /**
   * @konstantinosporo
   * @description
   * Deletes a book by its ID from the API.
   * @param id - The ID of the book to delete.
   * @returns An observable of the deleted book.
   */
  deleteBookById(id: string): Observable<BookApi> {
    return this.http.delete<BookApi>(`${this.bookApiUrl}/${id}`);
  }
}
