import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ReceiptAmountAttributesForm, ReceiptFundsAttributesForm } from '../../components/receipt-funds-input/receipt-funds-input.component.types';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  //Перевірка на існуючи параметри amount_at_nbu_exchange_rate і nbu_exchange_rate якщо currencyName долар і навпаки
  isCurrencyDependencyValid(group: AbstractControl<ReceiptFundsAttributesForm>): boolean {
    const currencyName = group.get('receipt_amount')?.get('currency')?.get('currencyName')?.value;
    const amountAtNbuExchangeRate = group.get('receipt_amount')?.get('amount_at_nbu_exchange_rate')?.value;
    const nbuExchangeRate = group.get('receipt_amount')?.get('nbu_exchange_rate')?.value;
    if (currencyName === 'долар' && (!amountAtNbuExchangeRate || !nbuExchangeRate)) {
      return false;
    }
    return true;
  }

  getReceiptFundsInputyValidator(): ValidatorFn {
    return (group: AbstractControl<ReceiptFundsAttributesForm>): ValidationErrors | null => {
      let validatorsError: any = {};

      if (!this.isCurrencyDependencyValid(group)) {
        validatorsError['currencyDependencyError'] = true;
      }

      return Object.keys(validatorsError).length === 0 ? null : validatorsError;
    }
  }
}
