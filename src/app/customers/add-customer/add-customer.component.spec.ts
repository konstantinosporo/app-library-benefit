import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerComponent } from './add-customer.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('AddCustomerComponent', () => {
  let component: AddCustomerComponent;
  let fixture: ComponentFixture<AddCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCustomerComponent],
      providers: [HttpClient, HttpHandler]

    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
