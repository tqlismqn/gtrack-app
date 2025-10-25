import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { filter } from 'rxjs/operators';

interface NotificationItem {
  icon: string;
  title: string;
  time: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule, MatMenuModule, MatDividerModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() sidebarCollapsed = false;

  companyName = 'Test Company';
  currentModule = 'Dashboard';
  notificationCount = 2;
  notifications: NotificationItem[] = [
    { icon: 'info', title: 'New driver document expiring soon', time: '2 hours ago' },
    { icon: 'warning', title: 'Vehicle maintenance required', time: '5 hours ago' }
  ];
  searchVisible = false;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.updateCurrentModule();
    });

    this.updateCurrentModule();
    this.notificationCount = this.notifications.length;
  }

  updateCurrentModule(): void {
    const url = this.router.url;
    if (url.includes('/drivers')) {
      this.currentModule = 'Drivers';
    } else if (url.includes('/vehicles')) {
      this.currentModule = 'Vehicles';
    } else if (url.includes('/customers')) {
      this.currentModule = 'Customers';
    } else if (url.includes('/orders')) {
      this.currentModule = 'Orders';
    } else if (url.includes('/invoices')) {
      this.currentModule = 'Invoices';
    } else if (url.includes('/settings')) {
      this.currentModule = 'Settings';
    } else {
      this.currentModule = 'Dashboard';
    }
  }

  toggleSearch(): void {
    this.searchVisible = !this.searchVisible;
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    console.log('Search query:', target.value);
  }

  logout(): void {
    console.log('Logout clicked');
  }
}
