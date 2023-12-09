/*export interface CurrencySaleProceedsAttributes {
    date: Date; // дата
    sale_proceeds_in_uah: number; // гривні від продажу float
    exchange_rate_difference_amount: number; // Сума курсової різниці float
}*/

import { CurrencySaleProceedsAttributes } from "Types/sequelizeDBTypes";
import { CreationOptional, DataTypes, Model, Sequelize } from "sequelize";

export class CurrencySaleProceeds
    extends Model<CurrencySaleProceedsAttributes,
        Omit<CurrencySaleProceedsAttributes, 'id'>> {
    declare id: CreationOptional<number>;
    declare date: Date;
    declare sale_proceeds_in_uah: number;
    declare exchange_rate_difference_amount: number;

    static initModel(sequelize: Sequelize): typeof CurrencySaleProceeds {
        CurrencySaleProceeds.init({
            date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            sale_proceeds_in_uah: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            exchange_rate_difference_amount: {
                type: DataTypes.NUMBER,
                allowNull: false,
            }
        }, {
            sequelize, // передача екземпляру sequelize
        });

        return CurrencySaleProceeds;
    }
}