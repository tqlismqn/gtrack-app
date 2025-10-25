import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DocumentStatus } from '../../models/driver.model';

@Component({
  selector: 'app-document-status-badge',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  template: `
    <span 
      class="status-badge" 
      [ngClass]="'status-' + status"
      [matTooltip]="getTooltip()">
      {{ getIcon() }}
    </span>
  `,
  styles: [`
    .status-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      font-size: 16px;
      cursor: help;
    }

    .status-valid {
      background-color: #4caf50;
      color: white;
    }

    .status-warning {
      background-color: #ff9800;
      color: white;
    }

    .status-expiring_soon {
      background-color: #ffc107;
      color: white;
    }

    .status-expired {
      background-color: #f44336;
      color: white;
    }

    .status-no_data {
      background-color: #9e9e9e;
      color: white;
    }
  `]
})
export class DocumentStatusBadgeComponent {
  @Input() status!: DocumentStatus;
  @Input() daysUntilExpiry?: number;
  @Input() documentName?: string;

  getIcon(): string {
    switch (this.status) {
      case 'valid': return '✓';
      case 'warning': return '⚠';
      case 'expiring_soon': return '⚠';
      case 'expired': return '✕';
      case 'no_data': return '?';
      default: return '?';
    }
  }

  getTooltip(): string {
    const docName = this.documentName || 'Document';
    const days = this.daysUntilExpiry ?? 'N/A';
    
    if (this.status === 'valid') {
      return `${docName}: Valid (${days} days remaining)`;
    } else if (this.status === 'expiring_soon') {
      return `${docName}: Expiring soon (${days} days)`;
    } else if (this.status === 'warning') {
      return `${docName}: Warning (${days} days)`;
    } else if (this.status === 'expired') {
      return `${docName}: Expired!`;
    } else {
      return `${docName}: No data`;
    }
  }
}
