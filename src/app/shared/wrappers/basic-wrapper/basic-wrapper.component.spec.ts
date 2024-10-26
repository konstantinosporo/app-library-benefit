import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicWrapperComponent } from './basic-wrapper.component';

describe('BasicWrapperComponent', () => {
  let component: BasicWrapperComponent;
  let fixture: ComponentFixture<BasicWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
