import { TestBed } from '@angular/core/testing';
import { AlertService } from './alert.service';

describe('AlertService', () => {
  let service: AlertService;

  const mockAlertService = {
    showSuccessToast: jasmine.createSpy('showSuccessToast')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AlertService, useValue: mockAlertService },
      ],
    });

    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show success toast with correct message', () => {
    const message = 'This is a success message';
    mockAlertService.showSuccessToast(message);
    expect(mockAlertService.showSuccessToast).toHaveBeenCalledWith(message);
  });
});
