(window as any).__dirname = '/шлях/до/вашої/директорії';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

(window as any).__dirname = './'

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
