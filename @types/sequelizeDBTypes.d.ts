import { DbError } from "./error";

export type DbInfo = {
    connection: 'connecting' | 'error-connection' | 'error' | 'connected' | 'no-started';
    error?: DbError
}

//Надходження коштів на банківські рахунки
export interface ReceiptFundsAttributes {
    date: Date;
    input_document_number: string; //Номер вхідного документу
    receipt_amount: ReceiptAmountAttributes //Сума надходження
    donors: DonorsAttributes //Благодійники
    currency_sale_proceeds: CurrencySaleProceedsAttributes //Надходження від продажу валюти
    accounting_entry: AccountingEntryAttributes //Бухгалтерська проводка
}

//Сума надходження
export interface ReceiptAmountAttributes {
    receiptNameId: number;
    receiptName?: ReceiptAmountNameAttributes; // квитанція
    currencyNameId: number;
    currencyName?: CurrencyNameAttributes; //валюта
    amount: number; //сума float
    amount_at_nbu_exchange_rate?: number; //Сума за курсом НБУ float
    nbu_exchange_rate?: number; //Курс НБУ під час створення float
}

//cума надходження назва
export interface ReceiptAmountNameAttributes {
    id: number;
    name: 'АТ "УНІВЕРСАЛ БАНК" UA683220010000026009490001143' |
    'АТ КБ "ПРИВАТБАНК" UA483375460000026001015201967' |
    'АТ КБ "ПРИВАТБАНК" UA063375460000026009035200553'; // АТ "УНІВЕРСАЛ БАНК" UA683220010000026009490001143 | АТ КБ "ПРИВАТБАНК" UA483375460000026001015201967 | АТ КБ "ПРИВАТБАНК" UA063375460000026009035200553
}

//валюта
export interface CurrencyNameAttributes {
    id: number;
    currencyName: "гривня" | "долар"; // гривня | долар
}

//Благодійники
export interface DonorsAttributes {
    donorNameId: number;
    donorName?: DonorsNameAttributes; // назва
    payment_purpose: string; //Призначення платежу
}

//Благодійники назва
export interface DonorsNameAttributes {
    id: number;
    name: 'фізична особа' | 'юридична особа' | 'грантодавці'; // фізична особа | юридична особа | грантодавці
}

//Надходження від продажу валюти
export interface CurrencySaleProceedsAttributes {
    date: Date; // дата
    sale_proceeds_in_uah: number; // гривні від продажу float
    exchange_rate_difference_amount: number; // Сума курсової різниці float
}

//Бухгалтерська проводка
export interface AccountingEntryAttributes {
    debit: number; // дебіт
    credit: number; // кредіт
}

