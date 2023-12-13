import { AccountingEntry } from "../models/accountingEntry.model";
import { CurrencyName } from "../models/currencyName.model";
import { CurrencySaleProceeds } from "../models/currencySaleProceeds.model";
import { Donors } from "../models/donors.model";
import { DonorsName } from "../models/donorsName.model";
import { ReceiptAmount } from "../models/receiptAmount.model";
import { ReceiptAmountName } from "../models/receiptAmountName.model";

const donorsAssociationsInclude = [{
    model: DonorsName,
    as: 'donorName',
}];

const receiptAmountAssociationsInclude = [{
    model: ReceiptAmountName,
    as: 'receiptName',
},
{
    model: CurrencyName,
    as: 'currencyName'
}];

const receiptFundsAssociationsInclude = [{
    model: ReceiptAmount,
    as: 'receipt_amount',
    include: receiptAmountAssociationsInclude
},
{
    model: Donors,
    as: 'donors',
    include: donorsAssociationsInclude
},
{
    model: CurrencySaleProceeds,
    as: 'currency_sale_proceeds',
},
{
    model: AccountingEntry,
    as: 'accounting_entry',
}];

export {
    donorsAssociationsInclude,
    receiptAmountAssociationsInclude,
    receiptFundsAssociationsInclude
}