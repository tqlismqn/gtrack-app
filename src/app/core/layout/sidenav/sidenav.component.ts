import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatListModule,
    MatIconModule
  ],
  template: `
    <nav class="sidenav">
      <mat-nav-list>
        <a mat-list-item 
           routerLink="/dashboard" 
           routerLinkActive="active">
          <mat-icon matListItemIcon>dashboard</mat-icon>
          <span matListItemTitle>Dashboard</span>
        </a>
        
        <a mat-list-item 
           routerLink="/drivers" 
           routerLinkActive="active">
          <mat-icon matListItemIcon>local_shipping</mat-icon>
          <span matListItemTitle>Drivers</span>
        </a>

        <a mat-list-item disabled>
          <mat-icon matListItemIcon>directions_car</mat-icon>
          <span matListItemTitle>Vehicles</span>
          <span class="badge">Soon</span>
        </a>

        <a mat-list-item disabled>
          <mat-icon matListItemIcon>people</mat-icon>
          <span matListItemTitle>Customers</span>
          <span class="badge">Soon</span>
        </a>

        <a mat-list-item disabled>
          <mat-icon matListItemIcon>assignment</mat-icon>
          <span matListItemTitle>Orders</span>
          <span class="badge">Soon</span>
        </a>

        <a mat-list-item disabled>
          <mat-icon matListItemIcon>receipt</mat-icon>
          <span matListItemTitle>Invoices</span>
          <span class="badge">Soon</span>
        </a>
      </mat-nav-list>
    </nav>
  `,
  styles: [`
    .sidenav {
      width: 260px;
      background-color: white;
      border-right: 1px solid #e0e0e0;
      height: 100%;
    }

    .badge {
      margin-left: auto;
      font-size: 11px;
      background-color: #ffa726;
      color: white;
      padding: 2px 8px;
      border-radius: 12px;
    }

    a[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .active {
      background-color: rgba(63, 81, 181, 0.1);
    }
  `]
})
export class SidenavComponent {}
