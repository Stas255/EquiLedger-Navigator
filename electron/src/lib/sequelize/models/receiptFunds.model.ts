import { ReceiptFundsAttributes } from 'Types/sequelizeDBTypes';
import { Model, DataTypes, NonAttribute, Association, Includeable, HasManyCreateAssociationMixin, CreationOptional, InferAttributes, InferCreationAttributes, HasOneCreateAssociationMixin, Sequelize } from 'sequelize';
import { ReceiptAmount } from './receiptAmount.model';
import { Donors } from './donors.model';
import { CurrencySaleProceeds } from './currencySaleProceeds.model';
import { AccountingEntry } from './accountingEntry.model';
import { ReceiptAmountName } from './receiptAmountName.model';
import { CurrencyName } from './currencyName.model';
import { DonorsName } from './donorsName.model';

/*export interface ReceiptFundsAttributes {
    date: Date;
    input_document_number: string; //Номер вхідного документу
    receipt_amount: ReceiptAmountAttributes //Сума надходження
    donors: DonorsAttributes //Благодійники
    currency_sale_proceeds: CurrencySaleProceedsAttributes //Надходження від продажу валюти
    accounting_entry: AccountingEntryAttributes //Бухгалтерська проводка
}*/

export class ReceiptFunds
  extends Model<Omit<ReceiptFundsAttributes, 'receipt_amount' | 'donors' | 'currency_sale_proceeds' | 'accounting_entry'>,
    Omit<ReceiptFundsAttributes, 'id'>> {
  declare id: CreationOptional<number>;
  declare date: Date;
  declare input_document_number: string;

  declare receipt_amount: NonAttribute<ReceiptAmount>;
  declare donors: NonAttribute<Donors>;
  declare currency_sale_proceeds: NonAttribute<CurrencySaleProceeds>;
  declare accounting_entry: NonAttribute<AccountingEntry>;

  declare static associations: {
    receipt_amount: Association<ReceiptFunds, ReceiptAmount>;
    donors: Association<ReceiptFunds, Donors>;
    currency_sale_proceeds: Association<ReceiptFunds, CurrencySaleProceeds>;
    accounting_entry: Association<ReceiptFunds, AccountingEntry>;
    donor: Association<Donors, DonorsName>;
  };

  static initModel(sequelize: Sequelize): typeof ReceiptFunds {
    ReceiptFunds.init({
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      input_document_number: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }, {
      sequelize, // передача екземпляру sequelize
    });

    return ReceiptFunds;
  }
}