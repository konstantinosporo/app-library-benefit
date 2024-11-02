import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import { ChartHeatmapComponent } from './chart-heatmap.component';

const mockEChartsConfig = {};

describe('ChartHeatmapComponent', () => {
  let component: ChartHeatmapComponent;
  let fixture: ComponentFixture<ChartHeatmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartHeatmapComponent,],
      providers: [
        {
          provide: NGX_ECHARTS_CONFIG,
          useValue: mockEChartsConfig
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChartHeatmapComponent);
    component = fixture.componentInstance;

    // Set mock data
    component.data = {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      counts: [10, 20, 30, 40, 50]
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

