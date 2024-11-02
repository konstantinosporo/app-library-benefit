import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReservationComponent } from './add-reservation.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('AddReservationComponent', () => {
  let component: AddReservationComponent;
  let fixture: ComponentFixture<AddReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddReservationComponent],
      providers: [HttpClient, HttpHandler]

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
