import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsComponent } from './reservations.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ReservationsComponent', () => {
  let component: ReservationsComponent;
  let fixture: ComponentFixture<ReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationsComponent],
      providers: [HttpClient, HttpHandler]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
