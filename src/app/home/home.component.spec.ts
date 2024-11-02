import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClient, HttpHandler } from '@angular/common/http';
import { HeatmapComponent } from './dashboard/heatmap/heatmap.component';
import { QuickSettingsComponent } from './dashboard/quick-settings/quick-settings.component';
import { HomeComponent } from './home.component';
import { provideRouter } from '@angular/router';
import { routes } from '../app.routes';

describe('ChartHeatmapComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, HeatmapComponent, QuickSettingsComponent],
      providers: [HttpClient, HttpHandler, provideRouter(routes)]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
