import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartGaugeComponent } from './chart-gauge.component';
import { NGX_ECHARTS_CONFIG, NgxEchartsModule } from 'ngx-echarts';

const mockEChartsConfig = {};

describe('ChartGaugeComponent', () => {
  let component: ChartGaugeComponent;
  let fixture: ComponentFixture<ChartGaugeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartGaugeComponent, NgxEchartsModule],
      providers: [
        {
          provide: NGX_ECHARTS_CONFIG,
          useValue: mockEChartsConfig
        }
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChartGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
