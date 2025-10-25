import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DriversService } from '../services/drivers.service';
import { Driver, DocumentType, DOCUMENT_LABELS } from '../models/driver.model';
import { DocumentStatusBadgeComponent } from '../components/document-status-badge/document-status-badge.component';
import { DriverReadinessComponent } from '../components/driver-readiness/driver-readiness.component';

@Component({
  selector: 'app-drivers-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    DocumentStatusBadgeComponent,
    DriverReadinessComponent
  ],
  templateUrl: './drivers-list.component.html',
  styleUrls: ['./drivers-list.component.scss']
})
export class DriversListComponent implements OnInit {
  private driversService = inject(DriversService);

  drivers = signal<Driver[]>([]);
  selectedDriver = signal<Driver | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  
  searchText = signal<string>('');
  statusFilter = signal<string>('all');

  displayedColumns = ['internal_number', 'name', 'status', 'documents', 'readiness', 'actions'];

  ngOnInit() {
    this.loadDrivers();
  }

  loadDrivers() {
    this.loading.set(true);
    this.error.set(null);

    const params: any = {};
    if (this.searchText()) {
      params.search = this.searchText();
    }
    if (this.statusFilter() !== 'all') {
      params.status = this.statusFilter();
    }

    this.driversService.getDrivers(params).subscribe({
      next: (response) => {
        this.drivers.set(response.data);
        this.loading.set(false);
        
        // Auto-select first driver
        if (response.data.length > 0 && !this.selectedDriver()) {
          this.selectDriver(response.data[0]);
        }
      },
      error: (err) => {
        this.error.set('Failed to load drivers. Please try again.');
        this.loading.set(false);
        console.error('Error loading drivers:', err);
      }
    });
  }

  selectDriver(driver: Driver) {
    this.selectedDriver.set(driver);
  }

  getDriverReadiness(driver: Driver) {
    return this.driversService.getDriverReadiness(driver);
  }

  getFullName(driver: Driver): string {
    return `${driver.first_name} ${driver.middle_name || ''} ${driver.last_name}`.trim();
  }

  getDocumentLabel(type: DocumentType): string {
    return DOCUMENT_LABELS[type] ?? type;
  }

  onSearch() {
    this.loadDrivers();
  }

  onStatusFilterChange() {
    this.loadDrivers();
  }

  get searchTextModel(): string {
    return this.searchText();
  }

  set searchTextModel(value: string) {
    this.searchText.set(value);
  }

  get statusFilterModel(): string {
    return this.statusFilter();
  }

  set statusFilterModel(value: string) {
    this.statusFilter.set(value);
  }
}
