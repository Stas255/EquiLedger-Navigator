/*export interface СurrencyNameAttributes {
    currencyName: string; // гривня | долар
} */

import { ReceiptAmountNameAttributes, СurrencyNameAttributes } from "Types/sequelizeDBTypes";
import { CreationOptional, DataTypes, Model, Sequelize } from "sequelize";

export class СurrencyName
    extends Model<СurrencyNameAttributes,
        Omit<СurrencyNameAttributes, 'id'>> {
    declare id: CreationOptional<number>;
    declare name: string;

    static initModel(sequelize: Sequelize): typeof СurrencyName {
        СurrencyName.init({
            currencyName: {
                type: DataTypes.STRING,
                validate: {
                    isIn: [['гривня', 'долар']]
                }
            },
        }, {
            sequelize, // передача екземпляру sequelize
        });

        return СurrencyName;
    }
}