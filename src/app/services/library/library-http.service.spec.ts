import { TestBed } from '@angular/core/testing';

import { LibraryHttpService } from './library-http.service';

describe('LibraryHttpService', () => {
  let service: LibraryHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibraryHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
