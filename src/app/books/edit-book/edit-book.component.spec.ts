import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AlertService } from '../../services/alert-handlers/alert.service';
import { BookHttpService } from '../../services/book/book-http.service';
import { BookApi } from '../book/book';
import { EditBookComponent } from './edit-book.component';

describe('EditBookComponent', () => {
  let component: EditBookComponent;
  let fixture: ComponentFixture<EditBookComponent>;

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
    editBook: jasmine.createSpy('editBook').and.returnValue(of({
      _id: '1',
      name: 'Test Book Updated',
      year: 2024,
      type: 'Fiction',
      author: 'Test Author',
      available: true,
      createdOn: new Date(),
    } as BookApi))
  };

  const mockAlertService = {
    showInfoModal: jasmine.createSpy('showInfoModal'),
    showSuccessToast: jasmine.createSpy('showSuccessToast'),
    showDangerToast: jasmine.createSpy('showDangerToast')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBookComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: BookHttpService, useValue: mockBookHttpService },
        { provide: AlertService, useValue: mockAlertService },

      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form and load book data', () => {
    // Verify that the book data is correctly loaded into the form
    expect(component.bookFormControl.value).toEqual({
      name: 'Test Book',
      year: 2024,
      createdOn: jasmine.any(String), // Check if it's a string (formatted date)
      author: 'Test Author',
      type: 'Fiction'
    });
    expect(mockBookHttpService.getBookById).toHaveBeenCalledWith('1');
  });


});
