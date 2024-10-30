import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestChart2Component } from './test-chart2.component';

describe('TestChart2Component', () => {
  let component: TestChart2Component;
  let fixture: ComponentFixture<TestChart2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestChart2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestChart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
