/*export interface СurrencyNameAttributes {
    currencyName: string; // гривня | долар
} */

import { ReceiptAmountNameAttributes, CurrencyNameAttributes } from "Types/sequelizeDBTypes";
import { CreationOptional, DataTypes, Model, Sequelize } from "sequelize";

export class CurrencyName
    extends Model<Omit<CurrencyNameAttributes, 'id'>,
        Omit<CurrencyNameAttributes, 'id'>> {
    declare id: CreationOptional<number>;
    declare currencyName: string;

    static initModel(sequelize: Sequelize): typeof CurrencyName {
        CurrencyName.init({
            currencyName: {
                type: DataTypes.STRING,
                validate: {
                    isIn: [['гривня', 'долар']]
                }
            },
        }, {
            sequelize, // передача екземпляру sequelize
        });

        return CurrencyName;
    }
}