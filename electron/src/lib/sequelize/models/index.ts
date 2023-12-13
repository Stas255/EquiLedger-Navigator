import { Donors } from './donors.model';
import { AccountingEntry } from './accountingEntry.model';
import { CurrencyName } from './currencyName.model';
import { CurrencySaleProceeds } from './currencySaleProceeds.model';
import { DonorsName } from './donorsName.model';
import { ReceiptAmount } from './receiptAmount.model';
import { ReceiptAmountName } from './receiptAmountName.model';
import { ReceiptFunds } from './receiptFunds.model';
import { Email, User } from './user.model';

export = {
    Email, User,
    ReceiptFunds,
    ReceiptAmount,
    ReceiptAmountName,
    CurrencyName: CurrencyName,
    Donors,
    DonorsName,
    CurrencySaleProceeds,
    AccountingEntry
}