import { Component } from '@angular/core';
import { ElectronRenderService } from './service/electron-render.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular';
  constructor(private electronService: ElectronRenderService) {
    this.Call();
   }

  async Call() {
    if (this.electronService) {
      this.title += await this.electronService.callFunction('getSomeData', true);
    }
  }
}
