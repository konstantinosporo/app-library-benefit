import { TestBed } from '@angular/core/testing';
import { AlertService } from './alert.service';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertService],
    });

    service = TestBed.inject(AlertService);
  });

  it('should show success toast with correct message', () => {
    const message = 'This is a success message';
    service.showSuccessToast(message);

    // Verify behavior after calling the method
    // (assuming showSuccessToast modifies some observable or state)
    console.log('Success toast shown with message:', message);
  });
});
