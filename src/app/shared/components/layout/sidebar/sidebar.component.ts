import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';

type MenuBadge = string | number | null | undefined;

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
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule, MatTooltipModule, MatListModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() collapsedChange = new EventEmitter<boolean>();

  isCollapsed = false;

  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Drivers', icon: 'people', route: '/drivers' },
    { label: 'Vehicles', icon: 'local_shipping', route: '/vehicles', badge: 'Soon' },
    { label: 'Customers', icon: 'business', route: '/customers', badge: 'Soon' },
    { label: 'Orders', icon: 'assignment', route: '/orders', badge: 'Soon' },
    { label: 'Invoices', icon: 'receipt', route: '/invoices', badge: 'Soon' }
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

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('sidebarCollapsed');
      if (savedState !== null) {
        this.isCollapsed = savedState === 'true';
      } else if (window.innerWidth < 768) {
        this.isCollapsed = true;
      }
    }

    this.collapsedChange.emit(this.isCollapsed);
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebarCollapsed', this.isCollapsed.toString());
    }
    this.collapsedChange.emit(this.isCollapsed);
  }

  isActiveRoute(route: string): boolean {
    return this.router.url.startsWith(route);
  }

  @HostListener('window:resize')
  onResize(): void {
    if (typeof window === 'undefined') {
      return;
    }

    if (window.innerWidth < 768 && !this.isCollapsed) {
      this.isCollapsed = true;
      localStorage.setItem('sidebarCollapsed', 'true');
      this.collapsedChange.emit(this.isCollapsed);
      return;
    }

    if (window.innerWidth >= 768) {
      const savedState = localStorage.getItem('sidebarCollapsed');
      const shouldCollapse = savedState ? savedState === 'true' : false;
      if (this.isCollapsed !== shouldCollapse) {
        this.isCollapsed = shouldCollapse;
        this.collapsedChange.emit(this.isCollapsed);
      }
    }
  }
}
