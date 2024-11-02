import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickSettingsComponent } from './quick-settings.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { NGX_ECHARTS_CONFIG } from 'ngx-echarts';

const mockEChartsConfig = {};


describe('QuickSettingsComponent', () => {
  let component: QuickSettingsComponent;
  let fixture: ComponentFixture<QuickSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickSettingsComponent],
      providers: [HttpClient, HttpHandler,
        {
          provide: NGX_ECHARTS_CONFIG,
          useValue: mockEChartsConfig
        }
      ]


    })
      .compileComponents();

    fixture = TestBed.createComponent(QuickSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
