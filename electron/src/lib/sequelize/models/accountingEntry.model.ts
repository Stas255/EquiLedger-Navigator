/*export interface AccountingEntryAttributes {
    debit: number; // дебіт
    credit: number; // кредіт
}*/

import { AccountingEntryAttributes } from "Types/sequelizeDBTypes";
import { CreationOptional, DataTypes, Model, Sequelize } from "sequelize";

export class AccountingEntry
    extends Model<AccountingEntryAttributes,
        Omit<AccountingEntryAttributes, 'id'>> {
    declare id: CreationOptional<number>;
    declare debit: number;
    declare credit: number;

    static initModel(sequelize: Sequelize): typeof AccountingEntry {
        AccountingEntry.init({
            debit: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            credit: {
                type: DataTypes.NUMBER,
                allowNull: false,
            }
        }, {
            sequelize, // передача екземпляру sequelize
        });

        return AccountingEntry;
    }
}