import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Driver, DriversResponse } from '../models/driver.model';

@Injectable({
  providedIn: 'root'
})
export class DriversService {
  private http = inject(HttpClient);
  private readonly endpoint = '/drivers';

  getDrivers(params?: {
    search?: string;
    status?: string;
    per_page?: number;
    page?: number;
  }): Observable<DriversResponse> {
    return this.http.get<DriversResponse>(this.endpoint, { params });
  }

  getDriver(id: string): Observable<Driver> {
    return this.http.get<Driver>(`${this.endpoint}/${id}`);
  }

  getDriverReadiness(driver: Driver): {
    ready: boolean;
    validCount: number;
    warningCount: number;
    expiredCount: number;
    noDataCount: number;
  } {
    if (!driver.documents) {
      return { ready: false, validCount: 0, warningCount: 0, expiredCount: 0, noDataCount: 0 };
    }

    const validCount = driver.documents.filter(d => d.status === 'valid').length;
    const warningCount = driver.documents.filter(d => d.status === 'warning').length;
    const expiringCount = driver.documents.filter(d => d.status === 'expiring_soon').length;
    const expiredCount = driver.documents.filter(d => d.status === 'expired').length;
    const noDataCount = driver.documents.filter(d => d.status === 'no_data').length;

    // Driver is ready if all docs are valid or expiring soon (no expired docs)
    const ready = expiredCount === 0 && driver.documents.length > 0;

    return {
      ready,
      validCount,
      warningCount: warningCount + expiringCount,
      expiredCount,
      noDataCount
    };
  }
}
