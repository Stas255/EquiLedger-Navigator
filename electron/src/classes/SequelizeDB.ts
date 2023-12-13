import { Association, FindOptions, Includeable, Model, ModelStatic, Sequelize } from 'sequelize';
import { DbInfo, ReceiptFundsAttributes } from 'Types/sequelizeDBTypes';
import { Donors, DonorsName, ReceiptAmountName, ReceiptFunds, User, sequelize, storagePath, CurrencyName, ReceiptAmount } from '../lib/sequelize';
import { Email, Names, UserAttributes } from '../lib/sequelize/models/user.model';
import models from '../lib/sequelize/models';
import { receiptFundsAssociationsInclude } from '../lib/sequelize/associations';

interface ModelCreationAttributes<M extends Model> {
    [key: string]: any; // You can replace 'any' with more specific types if possible
}

export class SequelizeDB {
    sequelize: Sequelize = sequelize;
    _infor: DbInfo;

    constructor() {
        this._infor = { connection: 'no-started' };
    }

    get infor(): DbInfo {
        return this._infor;
    }

    get pathFile(): string {
        return storagePath;
    }

    connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            this._infor.connection = 'connecting';
            this.sequelize.authenticate()
                .then(async () => {
                    this._infor.connection = 'connected';
                    await sequelize.sync({ force: true });
                    this.insertData();
                    resolve();
                })
                .catch(err => {
                    this._infor = { connection: 'error-connection' };
                    this._infor.error = err instanceof Error ?
                        { message: err.message, stack: err.stack } :
                        { message: 'unnoun', stack: err.stack };
                    reject(err);
                });
        });

    }

    async saveModel<M extends Model>(
        modelName: keyof typeof models,
        data: ModelCreationAttributes<M>,
        associatedModels: Includeable[] = []
    ): Promise<M> {
        const model = models[modelName] as unknown as ModelStatic<M>;

        if (!model) {
            throw new Error(`Model ${modelName} not found`);
        }

        try {
            const instance = await model.create(data as any, {
                include: Object.values(associatedModels),
            });
            return instance.get({ plain: true });
        } catch (error) {
            console.error(`Error saving ${modelName}:`, error);
            throw error;
        }
    }

    async getAllModel<M extends Model>(
        modelName: keyof typeof models,
        associatedModels: Includeable[] = []
    ): Promise<M[]> {
        const model = models[modelName] as unknown as ModelStatic<M>;

        if (!model) {
            throw new Error(`Model ${modelName} not found`);
        }

        try {
            const instances = await model.findAll({
                include: associatedModels,
            });
            return instances.map(instance => instance.get({ plain: true }));
        } catch (error) {
            console.error(`Error retrieving ${modelName}:`, error);
            throw error;
        }
    }

    async getModel<M extends Model>(
        modelName: keyof typeof models,
        options: FindOptions,
        associatedModels: Includeable[] = []
    ): Promise<M | null> {
        const model = models[modelName] as unknown as ModelStatic<M>;

        if (!model) {
            throw new Error(`Model ${modelName} not found`);
        }

        try {
            const instance = await model.findOne({
                ...options,
                include: associatedModels,
            });
            return instance?.get({ plain: true });
        } catch (error) {
            console.error(`Error retrieving ${modelName}:`, error);
            throw error;
        }
    }

    async getModelByPk<M extends Model>(
        modelName: keyof typeof models,
        id: number,
        associatedModels: Includeable[] = []
    ): Promise<M | null> {
        const model = models[modelName] as unknown as ModelStatic<M>;

        if (!model) {
            throw new Error(`Model ${modelName} not found`);
        }

        try {
            const instance = await model.findByPk(id, {
                include: associatedModels,
            });
            return instance?.get({ plain: true });
        } catch (error) {
            console.error(`Error retrieving ${modelName}:`, error);
            throw error;
        }
    }

    saveReceiptFunds(data: ReceiptFundsAttributes): Promise<ReceiptFunds> {
        return this.saveModel<ReceiptFunds>('ReceiptFunds', data, receiptFundsAssociationsInclude);
    }

    getAllReceiptFunds(): Promise<ReceiptFunds[]> {
        return this.getAllModel<ReceiptFunds>('ReceiptFunds', receiptFundsAssociationsInclude);
    }

    getReceiptFunds(options: FindOptions): Promise<ReceiptFunds | null> {
        return this.getModel<ReceiptFunds>('ReceiptFunds', options, receiptFundsAssociationsInclude);
    }

    getReceiptFundsByPk(id: number): Promise<ReceiptFunds | null> {
        return this.getModelByPk<ReceiptFunds>('ReceiptFunds', id, receiptFundsAssociationsInclude);
    }

    getAllReceiptAmountNames(): Promise<ReceiptAmountName[]> {
        return this.getAllModel<ReceiptAmountName>('ReceiptAmountName');
    }
    getAllCurrencyNames(): Promise<CurrencyName[]> {
        return this.getAllModel<CurrencyName>('CurrencyName');
    }
    getAllDonorsNames(): Promise<DonorsName[]> {
        return this.getAllModel<DonorsName>('DonorsName');
    }

    insertData(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await ReceiptAmountName.findOrCreate({ where: { name: 'АТ "УНІВЕРСАЛ БАНК" UA683220010000026009490001143' } });
            await ReceiptAmountName.findOrCreate({ where: { name: 'АТ КБ "ПРИВАТБАНК" UA483375460000026001015201967' } });
            await ReceiptAmountName.findOrCreate({ where: { name: 'АТ КБ "ПРИВАТБАНК" UA063375460000026009035200553' } });
            await CurrencyName.findOrCreate({ where: { currencyName: 'гривня' } });
            await CurrencyName.findOrCreate({ where: { currencyName: 'долар' } });
            await DonorsName.findOrCreate({ where: { name: 'фізична особа' } });
            await DonorsName.findOrCreate({ where: { name: 'юридична особа' } });
            await DonorsName.findOrCreate({ where: { name: 'грантодавці' } });
            /*const instance = await this.saveReceiptFunds({
                date: new Date("2023-12-12T11:16:28.573Z"),
                input_document_number: "1212",
                receipt_amount: {
                    receiptNameId: 3,
                    currencyNameId: 1,
                    amount: 0
                },
                "donors": {
                    "donorNameId": "2",
                    "payment_purpose": "2121"
                },
                "currency_sale_proceeds": {
                    "date": "2023-12-12T11:16:28.574Z",
                    "sale_proceeds_in_uah": 0,
                    "exchange_rate_difference_amount": 0
                },
                "accounting_entry": {
                    "debit": 0,
                    "credit": 0
                }
            });*/
            const test = await this.getAllReceiptFunds();
            console.log(JSON.stringify(test));
            resolve();
        });
    }
}