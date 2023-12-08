import { Component, Input } from '@angular/core';
import { DbInfo } from 'Types/sequelizeDBTypes';

@Component({
  selector: 'app-db-status',
  templateUrl: './db-status.component.html',
  styleUrl: './db-status.component.css'
})
export class DbStatusComponent {
  @Input() dbInfo: DbInfo = { connection: 'no-started' };

  getIcon(connection: string): string {
    switch (connection) {
      case 'connecting':
        return 'sync';
      case 'error-connection':
      case 'error':
        return 'error_outline';
      case 'connected':
        return 'check_circle_outline';
      default:
        return 'help_outline';
    }
  }

  getIconClass(connection: string): string {
    switch (connection) {
      case 'connecting':
        return 'icon-connecting';
      case 'error-connection':
      case 'error':
        return 'icon-error';
      case 'connected':
        return 'icon-connected';
      case 'no-started':
        return 'icon-no-started';
      default:
        return '';
    }
  }
}
