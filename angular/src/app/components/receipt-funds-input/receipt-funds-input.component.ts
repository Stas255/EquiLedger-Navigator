import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountingEntryAttributesForm, CurrencySaleProceedsAttributesForm, DonorsAttributesForm, ReceiptAmountAttributesForm, ReceiptFundsAttributesForm } from './receipt-funds-input.component.types';
import { ValidationService } from '../../service/validation/validation.service';
@Component({
  selector: 'app-receipt-funds-input',
  templateUrl: './receipt-funds-input.component.html',
  styleUrl: './receipt-funds-input.component.css'
})

export class ReceiptFundsInputComponent {
  receiptFundsForm: FormGroup<ReceiptFundsAttributesForm>;

  constructor(private validationService: ValidationService) {
    this.receiptFundsForm = new FormGroup<ReceiptFundsAttributesForm>({
      date: new FormControl(new Date(), Validators.required),
      input_document_number: new FormControl('', Validators.required),
      receipt_amount: new FormGroup<ReceiptAmountAttributesForm>({
        receipt: new FormGroup({
          name: new FormControl('', Validators.required),
        }),
        currency: new FormGroup({
          currencyName: new FormControl('гривня', Validators.required),
        }),
        amount: new FormControl(0, [Validators.required, Validators.min(0)]),
        amount_at_nbu_exchange_rate: new FormControl({ value: null, disabled: true }, [Validators.min(0)]),
        nbu_exchange_rate: new FormControl({ value: null, disabled: true }, [Validators.min(0)])
      }),
      donors: new FormGroup<DonorsAttributesForm>({
        name: new FormGroup({
          type: new FormControl('фізична особа', Validators.required),
        }),
        payment_purpose: new FormControl('', Validators.required)
      }),
      currency_sale_proceeds: new FormGroup<CurrencySaleProceedsAttributesForm>({
        date: new FormControl(new Date(), Validators.required),
        sale_proceeds_in_uah: new FormControl(0, [Validators.required, Validators.min(0)]),
        exchange_rate_difference_amount: new FormControl(0, [Validators.required, Validators.min(0)])
      }),
      accounting_entry: new FormGroup<AccountingEntryAttributesForm>({
        debit: new FormControl(0, [Validators.required, Validators.min(0)]),
        credit: new FormControl(0, [Validators.required, Validators.min(0)])
      })
    }, { validators: validationService.getReceiptFundsInputyValidator() });
    this.setupCurrencyListener();
  }

  private setupCurrencyListener() {
    const currencyControl = this.receiptFundsForm.get('receipt_amount.currency.currencyName');

    currencyControl?.valueChanges.subscribe(currency => {
      if (currency === 'гривня') {
        this.receiptFundsForm.get('receipt_amount.amount_at_nbu_exchange_rate')?.setValue(null);
        this.receiptFundsForm.get('receipt_amount.nbu_exchange_rate')?.setValue(null);
      }else{
        this.receiptFundsForm.get('receipt_amount.amount_at_nbu_exchange_rate')?.setValue(0);
        this.receiptFundsForm.get('receipt_amount.nbu_exchange_rate')?.setValue(0);
      }
      const state = currency === 'гривня' ? 'disable' : 'enable';

      this.receiptFundsForm.get('receipt_amount.amount_at_nbu_exchange_rate')?.[state]();
      this.receiptFundsForm.get('receipt_amount.nbu_exchange_rate')?.[state]();
    });

  }

  onSubmit() {
    if (this.receiptFundsForm.valid) {
      console.log('Form Data: ', this.receiptFundsForm.value);
      // Тут можна додати логіку для відправлення даних на сервер
    }
  }
}
