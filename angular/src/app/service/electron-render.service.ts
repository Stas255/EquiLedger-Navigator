import { Injectable } from '@angular/core';
import { ElectronRender, Types, TypesReturn } from 'Types/index';

declare global {
  interface Window {
    electronRender: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ElectronRenderService {

  private renderApi: ElectronRender = window.electronRender;

  // Метод для виклику конкретної функції в electronRender
  callFunction<K extends keyof ElectronRender>(functionName: K, arg: Types[K]): Promise<TypesReturn[K]> {
    const func = this.renderApi[functionName];
    if (!func) {
      throw new Error(`Функція ${functionName} не знайдена`);
    }
    return func(arg);
  }
}
