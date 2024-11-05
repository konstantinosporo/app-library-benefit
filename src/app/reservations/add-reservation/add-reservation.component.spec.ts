import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReservationComponent } from './add-reservation.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AddReservationComponent', () => {
  let component: AddReservationComponent;
  let fixture: ComponentFixture<AddReservationComponent>;

  const mockActivatedRoute = {
    params: of({ id: '1' })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddReservationComponent],
      providers: [HttpClient, HttpHandler,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ]

    })
      .compileComponents();

    fixture = TestBed.createComponent(AddReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
