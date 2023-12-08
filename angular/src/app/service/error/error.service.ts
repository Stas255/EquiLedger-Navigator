import { Injectable } from '@angular/core';
import { ErrorDetail } from 'Types/error';
import { ElectronRenderService } from '../electron-render/electron-render.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorsSubject = new BehaviorSubject<ErrorDetail[]>([]);
  public errors$: Observable<ErrorDetail[]> = this.errorsSubject.asObservable();

  constructor(electronRenderService: ElectronRenderService) {
    electronRenderService.listenToMainProcess('receiveError', (error: ErrorDetail) => {
      this.addError(error);
    });
  }

  addError(error: ErrorDetail) {
    const currentErrors = this.errorsSubject.value;
    this.errorsSubject.next([...currentErrors, error]);
  }

  removeError(index: number) {
    const currentErrors = this.errorsSubject.value;
    if (index > -1 && index < currentErrors.length) {
      const updatedErrors = currentErrors.filter((_, i) => i !== index);
      this.errorsSubject.next(updatedErrors);
    }
  }

  clearAllErrors() {
    this.errorsSubject.next([]);
  }

  getErrors(): ErrorDetail[] {
    return this.errorsSubject.value;
  }
}
