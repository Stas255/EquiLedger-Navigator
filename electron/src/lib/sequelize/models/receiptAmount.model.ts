import { ReceiptAmountAttributes } from "Types/sequelizeDBTypes";
import { Association, CreationOptional, DataTypes, Model, NonAttribute, Sequelize } from "sequelize";
import { ReceiptAmountName } from "./receiptAmountName.model";
import { CurrencyName } from "./currencyName.model";

/*export interface ReceiptAmountAttributes {
    receiptId: number;
    receipt: ReceiptAmountNameAttributes; // квитанція
    currencyId: number;
    currency: СurrencyNameAttributes; //валюта
    amount: number; //сума float
    amount_at_nbu_exchange_rate: number; //Сума за курсом НБУ float
    nbu_exchange_rate: number; //Курс НБУ під час створення float
}*/


export class ReceiptAmount
    extends Model<Omit<ReceiptAmountAttributes, 'receipt' | 'currency'>,
        Omit<ReceiptAmountAttributes, 'id'>> {

    declare id: CreationOptional<number>;
    declare receiptNameId: number;
    declare currencyNameId: number;
    declare amount: number;
    declare amount_at_nbu_exchange_rate: number;
    declare nbu_exchange_rate: number;

    declare receiptName: NonAttribute<ReceiptAmountName>;
    declare currencyName: NonAttribute<CurrencyName>;

    declare static associations: {
        receiptName: Association<ReceiptAmount, ReceiptAmountName>;
        currencyName: Association<ReceiptAmount, CurrencyName>;
    };

    static initModel(sequelize: Sequelize): typeof ReceiptAmount {
        ReceiptAmount.init({
            receiptNameId: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            currencyNameId: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
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