/*export interface ReceiptAmountNameAttributes {
    name: string; // АТ "УНІВЕРСАЛ БАНК" UA683220010000026009490001143 | АТ КБ "ПРИВАТБАНК" UA483375460000026001015201967 | АТ КБ "ПРИВАТБАНК" UA063375460000026009035200553
} */

import { ReceiptAmountNameAttributes } from "Types/sequelizeDBTypes";
import { CreationOptional, DataTypes, Model, Sequelize } from "sequelize";

export class ReceiptAmountName
    extends Model<Omit<ReceiptAmountNameAttributes, 'id'>,
        Omit<ReceiptAmountNameAttributes, 'id'>> {
    declare id: CreationOptional<number>;
    declare name: string;

    static initModel(sequelize: Sequelize): typeof ReceiptAmountName {
        ReceiptAmountName.init({
            name: {
                type: DataTypes.STRING,
                validate: {
                    isIn: [['АТ "УНІВЕРСАЛ БАНК" UA683220010000026009490001143',
                        'АТ КБ "ПРИВАТБАНК" UA483375460000026001015201967',
                        'АТ КБ "ПРИВАТБАНК" UA063375460000026009035200553']]
                }
            },
        }, {
            sequelize, // передача екземпляру sequelize
        });

        return ReceiptAmountName;
    }
}