import { Injectable } from '@angular/core';
import { FunctionMapInvoke, TypesInputInvoke, TypesInputKeysSend, TypesReturnInvoke, TypesReturnSend, FunctionMapSend } from 'Types/index';

declare global {
  interface Window {
    electronRenderInvoke: any;
    electronRenderSend: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ElectronRenderService {

  private renderApiInvoke: FunctionMapInvoke = window.electronRenderInvoke;
  private renderApiSend: FunctionMapSend = window.electronRenderSend;
  
  callFunction<K extends keyof FunctionMapInvoke>(functionName: K, arg: TypesInputInvoke[K]): Promise<TypesReturnInvoke[K]> {
    const func = this.renderApiInvoke[functionName];
    if (!func) {
      throw new Error(`Функція ${functionName} не знайдена`);
    }
    return func(arg);
  }

  listenToMainProcess<K extends TypesInputKeysSend>(messageKey: K, callback: (data: TypesReturnSend[K]) => void): void {
    const func = this.renderApiSend[messageKey];
    if (!func) {
      throw new Error(`Listener for message key ${messageKey} not found`);
    }
    func(callback);
  }
}
