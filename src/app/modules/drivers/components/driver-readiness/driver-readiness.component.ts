import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-driver-readiness',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, MatIconModule],
  template: `
    <div 
      class="readiness-indicator" 
      [ngClass]="{ 'ready': ready, 'not-ready': !ready }"
      [matTooltip]="getTooltip()">
      <mat-icon>{{ ready ? 'check_circle' : 'cancel' }}</mat-icon>
      <span>{{ ready ? 'Ready' : 'Not Ready' }}</span>
    </div>
  `,
  styles: [`
    .readiness-indicator {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 500;
      cursor: help;
    }

    .ready {
      background-color: #e8f5e9;
      color: #2e7d32;
    }

    .not-ready {
      background-color: #ffebee;
      color: #c62828;
    }

    mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }
  `]
})
export class DriverReadinessComponent {
  @Input() ready: boolean = false;
  @Input() validCount: number = 0;
  @Input() warningCount: number = 0;
  @Input() expiredCount: number = 0;
  @Input() noDataCount: number = 0;

  getTooltip(): string {
    return `Valid: ${this.validCount} | Warning: ${this.warningCount} | Expired: ${this.expiredCount} | No Data: ${this.noDataCount}`;
  }
}
