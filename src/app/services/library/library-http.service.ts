import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookApi } from '../../books/book/book';

@Injectable({
  providedIn: 'root'
})
export class LibraryHttpService {
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
  addBook(newBook: BookApi): Observable<BookApi> {
    return this.http.post<BookApi>(this.bookApiUrl, newBook);
  }
  editBook(newBook: BookApi): Observable<BookApi> {
    return this.http.put<BookApi>(this.bookApiUrl, newBook);
  }
  deleteBook(id: string): Observable<any> {
    console.log(`Deleting book with URL: ${this.bookApiUrl}/${id}`); // Log the URL
    return this.http.delete(`${this.bookApiUrl}/${id}`);
  }

}
