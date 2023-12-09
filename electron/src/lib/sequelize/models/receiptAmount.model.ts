import { ReceiptAmountAttributes } from "Types/sequelizeDBTypes";
import { Association, CreationOptional, DataTypes, Model, NonAttribute, Sequelize } from "sequelize";
import { ReceiptAmountName } from "./receiptAmountName.model";
import { СurrencyName } from "./currencyName.model";

/*export interface ReceiptAmountAttributes {
    receipt: ReceiptAmountNameAttributes; // квитанція
    currency: СurrencyNameAttributes; //валюта
    amount: number; //сума float
    amount_at_nbu_exchange_rate: number; //Сума за курсом НБУ float
    nbu_exchange_rate: number; //Курс НБУ під час створення float
}*/


export class ReceiptAmount
    extends Model<Omit<ReceiptAmountAttributes, 'receipt' | 'currency'>,
        Omit<ReceiptAmountAttributes, 'id'>> {

    declare id: CreationOptional<number>;
    declare amount: number;
    declare amount_at_nbu_exchange_rate: number;
    declare nbu_exchange_rate: number;

    declare receipt: NonAttribute<ReceiptAmountName>;
    declare currency: NonAttribute<СurrencyName>;

    declare static associations: {
        receipt: Association<ReceiptAmount, ReceiptAmountName>;
        currency: Association<ReceiptAmount, СurrencyName>;
    };

    static initModel(sequelize: Sequelize): typeof ReceiptAmount {
        ReceiptAmount.init({
            amount: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            amount_at_nbu_exchange_rate: {
                type: DataTypes.NUMBER,
                allowNull: true,
            },
            nbu_exchange_rate: {
                type: DataTypes.NUMBER,
                allowNull: true,
            }
        }, {
            sequelize, // передача екземпляру sequelize
        });

        return ReceiptAmount;
    }
}