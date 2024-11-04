import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiStatus } from '../../../services/api-health/api';
import { HealthCheckService } from '../../../services/api-health/health-check.service';
import { SpinnerComponent } from "../../../shared/spinner/spinner.component";
import { AsyncPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-api-status',
  standalone: true,
  imports: [SpinnerComponent, AsyncPipe, NgClass],
  templateUrl: './api-status.component.html',
  styleUrl: './api-status.component.css'
})
export class ApiStatusComponent {
  apiStatuses$!: Observable<ApiStatus[]>;

  constructor(
    private readonly healthCheckService: HealthCheckService,
  ) {
    this.apiStatuses$ = this.healthCheckService.checkApiStatus();
  }
}
