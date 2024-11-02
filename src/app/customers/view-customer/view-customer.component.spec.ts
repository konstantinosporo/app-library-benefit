import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CustomerHttpService } from '../../services/customers/customer-http.service';
import { ViewCustomerComponent } from './view-customer.component';

describe('ViewCustomerComponent', () => {
  let component: ViewCustomerComponent;
  let fixture: ComponentFixture<ViewCustomerComponent>;

  const mockActivatedRoute = {
    params: of({ id: '1' })
  };

  const mockCustomerHttpService = {
    getCustomerById: jasmine.createSpy('getCustomerById').and.returnValue(of({
      _id: '1',
      name: 'John',
      surname: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '12345678'
    })),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCustomerComponent],
      providers: [
        { provide: CustomerHttpService, useValue: mockCustomerHttpService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],

    })
      .compileComponents();

    fixture = TestBed.createComponent(ViewCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the data and initialize customerToView$', () => {
    component.customerToView$.subscribe(customer => {
      expect(customer).toBeTruthy();
      expect(customer._id).toBe('1');
      expect(customer.name).toBe('John');
      expect(customer.surname).toBe('Doe');
      expect(customer.email).toBe('john.doe@example.com');
      expect(customer.phoneNumber).toBe('12345678');
    })

    expect(mockCustomerHttpService.getCustomerById).toHaveBeenCalledWith('1');
  });

  afterEach(() => {
    component.ngOnDestroy();
  });
});

