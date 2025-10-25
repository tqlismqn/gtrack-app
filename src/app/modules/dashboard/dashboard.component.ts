import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <div class="dashboard">
      <h1>Dashboard</h1>
      
      <div class="stats-grid">
        <mat-card>
          <mat-card-content>
            <h2>25</h2>
            <p>Active Drivers</p>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-content>
            <h2>Coming Soon</h2>
            <p>Vehicles</p>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-content>
            <h2>Coming Soon</h2>
            <p>Orders</p>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-content>
            <h2>Coming Soon</h2>
            <p>Revenue</p>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 24px;
    }

    h1 {
      margin-bottom: 24px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }

    mat-card {
      text-align: center;
    }

    h2 {
      font-size: 36px;
      margin: 0 0 8px 0;
      color: #3f51b5;
    }

    p {
      margin: 0;
      color: #666;
    }
  `]
})
export class DashboardComponent {}
