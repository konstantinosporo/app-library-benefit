import { AsyncPipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { map } from 'rxjs';
import { BooksCarouselComponent } from "./books-carousel/books-carousel.component";
import { BookApi } from '../library/book/book';
import { LibraryHttpService } from '../services/library/library-http.service';
import { GlobalErrorComponent } from "../components/global-error/global-error.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgClass, BooksCarouselComponent, AsyncPipe, GlobalErrorComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private readonly libraryHttpService: LibraryHttpService) {
    this.libraryHttpService.getBooks().pipe(map(books => books.filter(book => book.available))).subscribe(availableBooks => {
      this.allBooks = availableBooks;
      this.chunkAvailableBooks();
      //console.log(this.chunkedBooks);
    });
   }

  allBooks!: BookApi[];
  chunkedBooks: BookApi[][]=[];
  booksPerSlide = 3;
  
   carouselItemList = [
    {
      label: 'First slide label',
      content: 'Some representative placeholder content for the first slide.',
      buttonText: 'Browse Library',
      imgSrc: '/home/home1.jpg'
    },
    {
      label: 'Second slide label',
      content: 'Some representative placeholder content for the second slide.',
      buttonText: 'News & Announcements',
      imgSrc: '/home/home2.jpg'
    },
    {
      label: 'Third slide label',
      content: 'Some representative placeholder content for the third slide.',
      buttonText: 'Register',
      imgSrc: '/home/home3.jpg'
    }
  ];

  chunkAvailableBooks() {
    //console.log('running');
    let availableBooks = this.allBooks.filter(book => book.available);
    //console.log(availableBooks);
    for (let i = 0; i < availableBooks.length; i += this.booksPerSlide){
      this.chunkedBooks.push(this.allBooks.slice(i, i + this.booksPerSlide));
    }
  }

  
}
