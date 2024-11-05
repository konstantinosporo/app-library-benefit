import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiStatusComponent } from './api-status.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ApiStatusComponent', () => {
  let component: ApiStatusComponent;
  let fixture: ComponentFixture<ApiStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiStatusComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ApiStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
