import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

type MenuBadge = number | null | undefined;

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  badge?: MenuBadge;
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() collapsedChange = new EventEmitter<boolean>();

  isCollapsed = false;

  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard'
    },
    {
      label: 'Drivers',
      icon: 'people',
      route: '/drivers'
    },
    {
      label: 'Vehicles',
      icon: 'local_shipping',
      route: '/vehicles',
      badge: 0
    },
    {
      label: 'Customers',
      icon: 'business',
      route: '/customers',
      badge: 0
    },
    {
      label: 'Orders',
      icon: 'assignment',
      route: '/orders',
      badge: 0
    },
    {
      label: 'Invoices',
      icon: 'receipt',
      route: '/invoices',
      badge: 0
    }
  ];

  settingsItems: MenuItem[] = [
    {
      label: 'Settings',
      icon: 'settings',
      route: '/settings',
      children: [
        { label: 'Profile', icon: 'person', route: '/settings/profile' },
        { label: 'Preferences', icon: 'tune', route: '/settings/preferences' },
        { label: 'Security', icon: 'lock', route: '/settings/security' }
      ]
    }
  ];

  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    this.collapsedChange.emit(this.isCollapsed);
  }

  isActiveRoute(route: string): boolean {
    return this.router.url.startsWith(route);
  }
}
