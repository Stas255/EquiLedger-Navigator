import { Injectable } from '@angular/core';
import { ElectronRenderService } from '../electron-render/electron-render.service';
import { CurrencyNameAttributes, DonorsNameAttributes, ReceiptAmountNameAttributes } from 'Types/sequelizeDBTypes';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  listReceiptAmountNames: ReceiptAmountNameAttributes[] = [];
  listCurrencyNames: CurrencyNameAttributes[] = [];
  listDonorsNames: DonorsNameAttributes[] = [];

  constructor(private electronRenderService: ElectronRenderService) { }

  loadAllData(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.listReceiptAmountNames = await this.electronRenderService.callFunction('getReceiptAmountNames', null);
      this.listCurrencyNames = await this.electronRenderService.callFunction('getCurrencyNames', null);
      this.listDonorsNames = await this.electronRenderService.callFunction('getDonorsNames', null);
      resolve(null);
    });
  }

  findReceiptAmountNameById(id: number): string | undefined {
    return this.listReceiptAmountNames.find(currency => currency.id === Number(id))?.name;
  }

  findCurrencyNameById(id: number): string | undefined {
    return this.listCurrencyNames.find(currency => currency.id === Number(id))?.currencyName;
  }

  findDonorsNameById(id: number): string | undefined {
    return this.listDonorsNames.find(currency => currency.id === Number(id))?.name;
  }
}
