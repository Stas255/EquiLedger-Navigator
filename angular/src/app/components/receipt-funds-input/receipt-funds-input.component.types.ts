import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { AccountingEntryAttributes, CurrencySaleProceedsAttributes, DonorsAttributes, DonorsNameAttributes, ReceiptAmountAttributes, ReceiptAmountNameAttributes, ReceiptFundsAttributes, СurrencyNameAttributes } from 'Types/sequelizeDBTypes';

export type ToForm<OriginalType> = {
  [key in keyof OriginalType]: OriginalType[key] extends Array<infer ArrayType>
    ? FormArray<
        ArrayType extends object
          ? FormGroup<ToForm<ArrayType>>
          : FormControl<ArrayType | null>
      >
    : OriginalType[key] extends Date
    ? FormControl<OriginalType[key] | null>
    : OriginalType[key] extends object
    ? FormGroup<ToForm<OriginalType[key]>>
    : FormControl<OriginalType[key] | null>;
};

export type ReceiptFundsAttributesForm = ToForm<ReceiptFundsAttributes>;
export type ReceiptAmountAttributesForm = ToForm<ReceiptAmountAttributes>;
export type ReceiptAmountNameAttributesForm = ToForm<ReceiptAmountNameAttributes>;
export type СurrencyNameAttributesForm = ToForm<СurrencyNameAttributes>;
export type DonorsAttributesForm = ToForm<DonorsAttributes>;
export type DonorsNameAttributesForm = ToForm<DonorsNameAttributes>;
export type CurrencySaleProceedsAttributesForm = ToForm<CurrencySaleProceedsAttributes>;
export type AccountingEntryAttributesForm = ToForm<AccountingEntryAttributes>;