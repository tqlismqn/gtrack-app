import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-drivers-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  template: `
    <div class="drivers-list">
      <h1>Drivers Module</h1>
      
      <mat-card>
        <mat-card-content>
          <p>Drivers module is under development.</p>
          <p>This will display a list of 25 drivers from the API.</p>
          <button mat-raised-button color="primary">
            Load Drivers (Coming Soon)
          </button>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .drivers-list {
      padding: 24px;
    }

    h1 {
      margin-bottom: 24px;
    }

    mat-card {
      max-width: 600px;
    }

    p {
      margin: 8px 0;
    }

    button {
      margin-top: 16px;
    }
  `]
})
export class DriversListComponent {}
