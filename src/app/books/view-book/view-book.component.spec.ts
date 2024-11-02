import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { BookHttpService } from '../../services/book/book-http.service';
import { BookApi } from '../book/book';
import { ViewBookComponent } from './view-book.component';

describe('ViewBookComponent', () => {
  let component: ViewBookComponent;
  let fixture: ComponentFixture<ViewBookComponent>;

  const mockActivatedRoute = {
    params: of({ id: '1' }) // Mock the route params
  };

  const mockBookHttpService = {
    getBookById: jasmine.createSpy('getBookById').and.returnValue(of({
      _id: '1',
      name: 'Test Book',
      year: 2024,
      type: 'Fiction',
      author: 'Test Author',
      available: true,
      createdOn: new Date(),
    } as BookApi)),
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewBookComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: BookHttpService, useValue: mockBookHttpService },
      ]

    })
      .compileComponents();

    fixture = TestBed.createComponent(ViewBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the data and initialize bookToView$', () => {
    component.bookToView$.subscribe(book => {
      expect(book).toBeTruthy();
      expect(book._id).toBe('1');
      expect(book.name).toBe('Test Book');
      expect(book.author).toBe('Test Author');
      expect(book.year).toBe(2024);
      expect(book.type).toBe('Fiction');
      expect(book.available).toBe(true);
    });

    expect(mockBookHttpService.getBookById).toHaveBeenCalledWith('1');
  });

  afterEach(() => {
    component.ngOnDestroy(); 
  });
});
