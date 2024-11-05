import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableBooksComponent } from './available-books.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../../../app.routes';

describe('AvailableBooksComponent', () => {
  let component: AvailableBooksComponent;
  let fixture: ComponentFixture<AvailableBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailableBooksComponent],
      providers: [HttpClient, HttpHandler, provideRouter(routes)]

    })
      .compileComponents();

    fixture = TestBed.createComponent(AvailableBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
