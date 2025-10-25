import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { filter } from 'rxjs/operators';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatMenuModule,
    MatDividerModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() sidebarCollapsed = false;

  breadcrumbs: Breadcrumb[] = [];
  notificationCount = 2;
  searchVisible = false;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateBreadcrumbs();
      });

    this.updateBreadcrumbs();
  }

  updateBreadcrumbs(): void {
    const url = this.router.url;
    this.breadcrumbs = [{ label: 'G-Track', url: '/' }];

    if (url.includes('/drivers')) {
      this.breadcrumbs.push({ label: 'Drivers', url: '/drivers' });
    } else if (url.includes('/vehicles')) {
      this.breadcrumbs.push({ label: 'Vehicles', url: '/vehicles' });
    } else if (url.includes('/customers')) {
      this.breadcrumbs.push({ label: 'Customers', url: '/customers' });
    } else if (url.includes('/orders')) {
      this.breadcrumbs.push({ label: 'Orders', url: '/orders' });
    } else if (url.includes('/invoices')) {
      this.breadcrumbs.push({ label: 'Invoices', url: '/invoices' });
    } else if (url.includes('/settings')) {
      this.breadcrumbs.push({ label: 'Settings', url: '/settings' });
    }
  }

  toggleSearch(): void {
    this.searchVisible = !this.searchVisible;
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    console.log('Search query:', target.value);
  }
}
