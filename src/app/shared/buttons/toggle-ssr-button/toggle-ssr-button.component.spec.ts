import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleSsrButtonComponent } from './toggle-ssr-button.component';

describe('ToggleSsrButtonComponent', () => {
  let component: ToggleSsrButtonComponent;
  let fixture: ComponentFixture<ToggleSsrButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleSsrButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleSsrButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
