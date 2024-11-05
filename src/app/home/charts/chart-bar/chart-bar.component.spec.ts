import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartBarComponent } from './chart-bar.component';
import { NGX_ECHARTS_CONFIG } from 'ngx-echarts';

const mockEChartsConfig = {};

describe('ChartBarComponent', () => {
  let component: ChartBarComponent;
  let fixture: ComponentFixture<ChartBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartBarComponent],
      providers: [
        {
          provide: NGX_ECHARTS_CONFIG,
          useValue: mockEChartsConfig
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
