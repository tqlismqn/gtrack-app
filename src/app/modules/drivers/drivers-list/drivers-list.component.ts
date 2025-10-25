import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

import { DriversService } from '../services/drivers.service';
import { Driver, DocumentStatus, DOCUMENT_LABELS, DriversResponse } from '../models/driver.model';

interface DriverStats {
  total: number;
  active: number;
  onLeave: number;
  documentsValid: number;
  documentsExpired: number;
}

interface DocumentSummary {
  valid: number;
  warning: number;
  expiringSoon: number;
  expired: number;
  noData: number;
}

@Component({
  selector: 'app-drivers-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatMenuModule
  ],
  templateUrl: './drivers-list.component.html',
  styleUrls: ['./drivers-list.component.scss']
})
export class DriversListComponent implements OnInit {
  private readonly driversService = inject(DriversService);

  readonly drivers = signal<Driver[]>([]);
  readonly selectedDriver = signal<Driver | null>(null);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  readonly searchQuery = signal<string>('');
  readonly selectedStatusFilter = signal<'all' | 'valid' | 'expiring' | 'expired'>('all');
  readonly currentPage = signal<number>(1);
  readonly pageSize = signal<number>(10);

  readonly stats = computed<DriverStats>(() => {
    const drivers = this.drivers();
    const documents = drivers.flatMap(driver => driver.documents ?? []);

    return {
      total: drivers.length,
      active: drivers.filter(driver => driver.status === 'active').length,
      onLeave: drivers.filter(driver => driver.status === 'on_leave').length,
      documentsValid: documents.filter(doc => doc.status === 'valid').length,
      documentsExpired: documents.filter(doc => doc.status === 'expired').length
    };
  });

  readonly filteredDrivers = computed<Driver[]>(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const statusFilter = this.selectedStatusFilter();

    return this.drivers().filter(driver => {
      const matchesQuery = !query
        || `${driver.first_name} ${driver.last_name}`.toLowerCase().includes(query)
        || driver.email.toLowerCase().includes(query)
        || driver.phone?.toLowerCase().includes(query)
        || driver.rodne_cislo?.toLowerCase().includes(query);

      if (!matchesQuery) {
        return false;
      }

      if (statusFilter === 'all') {
        return true;
      }

      const summary = this.getDocumentSummary(driver);

      if (statusFilter === 'valid') {
        return summary.expired === 0 && summary.warning === 0 && summary.expiringSoon === 0;
      }

      if (statusFilter === 'expiring') {
        return summary.warning > 0 || summary.expiringSoon > 0;
      }

      if (statusFilter === 'expired') {
        return summary.expired > 0;
      }

      return true;
    });
  });

  readonly paginatedDrivers = computed<Driver[]>(() => {
    const page = this.currentPage();
    const size = this.pageSize();
    const start = (page - 1) * size;
    const end = start + size;

    return this.filteredDrivers().slice(start, end);
  });

  get pageStart(): number {
    const total = this.filteredDrivers().length;
    if (total === 0) {
      return 0;
    }

    return (this.currentPage() - 1) * this.pageSize() + 1;
  }

  get pageEnd(): number {
    const total = this.filteredDrivers().length;
    if (total === 0) {
      return 0;
    }

    return Math.min(this.currentPage() * this.pageSize(), total);
  }

  ngOnInit(): void {
    this.loadDrivers();
  }

  loadDrivers(): void {
    this.loading.set(true);
    this.error.set(null);

    this.driversService.getDrivers({ per_page: 100 }).subscribe({
      next: (response: DriversResponse) => {
        this.drivers.set(response.data);
        this.loading.set(false);

        if (response.data.length > 0) {
          this.selectedDriver.set(response.data[0]);
        }

        this.ensureSelectedDriver();
      },
      error: (err) => {
        console.error('Error loading drivers:', err);
        this.error.set('Failed to load drivers. Please try again later.');
        this.loading.set(false);
      }
    });
  }

  filterByStatus(filter: 'all' | 'valid' | 'expiring' | 'expired'): void {
    this.selectedStatusFilter.set(filter);
    this.resetPagination();
    this.ensureSelectedDriver();
  }

  onSearch(): void {
    this.resetPagination();
    this.ensureSelectedDriver();
  }

  previousPage(): void {
    const nextPage = Math.max(1, this.currentPage() - 1);
    this.currentPage.set(nextPage);
  }

  nextPage(): void {
    const maxPage = Math.ceil(this.filteredDrivers().length / this.pageSize());
    const nextPage = Math.min(maxPage, this.currentPage() + 1);
    this.currentPage.set(nextPage);
  }

  getStatusLabel(status: Driver['status']): string {
    switch (status) {
      case 'active':
        return 'Active';
      case 'on_leave':
        return 'On Leave';
      case 'inactive':
        return 'Inactive';
      case 'terminated':
        return 'Terminated';
      default:
        return status;
    }
  }

  getDocumentSummary(driver: Driver): DocumentSummary {
    const documents = driver.documents ?? [];

    return {
      valid: documents.filter(doc => doc.status === 'valid').length,
      warning: documents.filter(doc => doc.status === 'warning').length,
      expiringSoon: documents.filter(doc => doc.status === 'expiring_soon').length,
      expired: documents.filter(doc => doc.status === 'expired').length,
      noData: documents.filter(doc => doc.status === 'no_data').length
    };
  }

  getDocumentTooltip(status: DocumentStatus): string {
    switch (status) {
      case 'valid':
        return 'Document is valid';
      case 'warning':
        return 'Document requires attention';
      case 'expiring_soon':
        return 'Document expiring within 30 days';
      case 'expired':
        return 'Document has expired';
      case 'no_data':
        return 'Document data not available';
      default:
        return 'Document status unknown';
    }
  }

  getDocumentStatuses(driver: Driver): DocumentStatus[] {
    if (!driver.documents || driver.documents.length === 0) {
      return ['no_data'];
    }

    return driver.documents
      .map(doc => doc.status)
      .slice(0, 5);
  }

  getExpiringCount(driver: Driver): number {
    const summary = this.getDocumentSummary(driver);
    return summary.warning + summary.expiringSoon;
  }

  getInitials(driver: Driver): string {
    const first = driver.first_name?.charAt(0) ?? '';
    const last = driver.last_name?.charAt(0) ?? '';
    return `${first}${last}`.toUpperCase();
  }

  getFullName(driver: Driver): string {
    return `${driver.first_name} ${driver.middle_name ?? ''} ${driver.last_name}`.replace(/\s+/g, ' ').trim();
  }

  selectDriver(driver: Driver): void {
    this.selectedDriver.set(driver);
  }

  resetPagination(): void {
    this.currentPage.set(1);
  }

  ensureSelectedDriver(): void {
    const list = this.filteredDrivers();
    const current = this.selectedDriver();

    if (list.length === 0) {
      this.selectedDriver.set(null);
      return;
    }

    if (!current || !list.some(driver => driver.id === current.id)) {
      this.selectedDriver.set(list[0]);
    }
  }

  getDocumentLabel(type: keyof typeof DOCUMENT_LABELS): string {
    return DOCUMENT_LABELS[type] ?? type;
  }

  get selectedDriverDocuments() {
    return this.selectedDriver()?.documents ?? [];
  }

  get searchModel(): string {
    return this.searchQuery();
  }

  set searchModel(value: string) {
    this.searchQuery.set(value);
  }

  testApi(): void {
    this.driversService.getDrivers({ per_page: 5 }).subscribe({
      next: (response) => {
        console.log('✅ API Test Success!', response);
        alert(`✅ API Working! Loaded ${response.data.length} drivers`);
      },
      error: (err) => {
        console.error('❌ API Test Failed!', err);
        alert(`❌ API Error: ${err.message || 'Unknown error'}`);
      }
    });
  }
}
