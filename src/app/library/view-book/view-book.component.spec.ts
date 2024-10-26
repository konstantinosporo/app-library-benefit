import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBookComponent } from './view-book.component';

describe('ViewBookComponent', () => {
  let component: ViewBookComponent;
  let fixture: ComponentFixture<ViewBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
