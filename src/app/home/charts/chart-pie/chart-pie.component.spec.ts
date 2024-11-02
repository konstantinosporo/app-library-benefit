import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPieComponent } from './chart-pie.component';
import { NGX_ECHARTS_CONFIG } from 'ngx-echarts';

const mockEChartsConfig = {};

describe('ChartPieComponent', () => {
  let component: ChartPieComponent;
  let fixture: ComponentFixture<ChartPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartPieComponent],
      providers: [
        {
          provide: NGX_ECHARTS_CONFIG,
          useValue: mockEChartsConfig
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChartPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
