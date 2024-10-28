import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshPageButtonComponent } from './refresh-page-button.component';

describe('RefreshPageButtonComponent', () => {
  let component: RefreshPageButtonComponent;
  let fixture: ComponentFixture<RefreshPageButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefreshPageButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefreshPageButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
