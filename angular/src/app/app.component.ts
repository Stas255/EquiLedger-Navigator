import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { ElectronRenderService } from './service/electron-render/electron-render.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { ErrorService } from './service/error/error.service';
import { DbInfo } from 'Types/sequelizeDBTypes';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular';
  dbPath = '';
  dbData = '';
  errorCount: number = 0;
  currentDbStatus: DbInfo = { connection: 'no-started' };
  private subscriptions = new Subscription();

  constructor(private zone: NgZone, private dialog: MatDialog, private errorService: ErrorService, private electronRenderService: ElectronRenderService,
    private cd: ChangeDetectorRef) {
  }

  async Call() {
    if (this.electronRenderService) {
      this.title += await this.electronRenderService.callFunction('getSomeData', true);
      this.dbPath = await this.electronRenderService.callFunction('getDbPath', null);
      this.dbData = JSON.stringify(await this.electronRenderService.callFunction('getDbData', null));
    }
  }

  ngOnInit() {
    this.Call();
    this.subscriptions.add(
      this.errorService.errors$.subscribe(errors => {
        this.zone.run(() => {
          this.errorCount = errors.length;
          console.log(this.errorCount);
        });
      })
    );
    this.electronRenderService.listenToMainProcess('getDbInfo', async (data) => {
      this.currentDbStatus = data;
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  showErrors() {
    const allErrors = this.errorService.getErrors();
    if (allErrors.length > 0) {
      this.dialog.open(ErrorDialogComponent, {
        data: allErrors,
        width: '600px' // Optionally set a width
      });
    }
  }
}
