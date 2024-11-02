import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { AlertService } from '../../services/alert-handlers/alert.service';
import { CustomerHttpService } from '../../services/customers/customer-http.service';
import { BasicWrapperComponent } from '../../shared/wrappers/basic-wrapper/basic-wrapper.component';
import { EditCustomerComponent } from './edit-customer.component';

describe('EditCustomerComponent', () => {
  let component: EditCustomerComponent;
  let fixture: ComponentFixture<EditCustomerComponent>;

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
    editCustomer: jasmine.createSpy('editCustomer').and.returnValue(of({ _id: '1' }))
  };

  const mockAlertService = {
    showInfoModal: jasmine.createSpy('showInfoModal'),
    showSuccessToast: jasmine.createSpy('showSuccessToast')
  };

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, BasicWrapperComponent, EditCustomerComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: CustomerHttpService, useValue: mockCustomerHttpService },
        { provide: AlertService, useValue: mockAlertService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form and load customer data', () => {
    expect(component.customerFormControl.value).toEqual({
      name: 'John',
      surname: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '12345678'
    });
    expect(mockCustomerHttpService.getCustomerById).toHaveBeenCalledWith('1');
  });

  it('should navigate to customers after editing', () => {
    component.confirmEdit(); // Simulate editing
    expect(mockAlertService.showSuccessToast).toHaveBeenCalledWith('Customer with ID: 1 successfully edited!');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['customers']);
  });
});
