import path from "node:path";
import { app } from 'electron';
import { Sequelize } from "sequelize";
import { Donors } from './models/donors.model';
import { AccountingEntry } from './models/accountingEntry.model';
import { CurrencyName } from './models/currencyName.model';
import { CurrencySaleProceeds } from './models/currencySaleProceeds.model';
import { DonorsName } from './models/donorsName.model';
import { ReceiptAmount } from './models/receiptAmount.model';
import { ReceiptAmountName } from './models/receiptAmountName.model';
import { ReceiptFunds } from './models/receiptFunds.model';
import { Email, User, Names } from './models/user.model';


const storagePath = app.isPackaged ? path.join(path.dirname(app.getPath('exe')), '/db/local-database.sqlite') : path.join(__dirname, '/db/local-database.sqlite');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: storagePath
});


User.initModel(sequelize);
Email.initModel(sequelize);
Names.initModel(sequelize);

ReceiptFunds.initModel(sequelize);
ReceiptAmount.initModel(sequelize);
ReceiptAmountName.initModel(sequelize);
CurrencyName.initModel(sequelize);
Donors.initModel(sequelize);
DonorsName.initModel(sequelize);
CurrencySaleProceeds.initModel(sequelize);
AccountingEntry.initModel(sequelize);

/*User.hasOne(Email, {
    foreignKey: 'userId',
    as: 'email'
});*/

User.belongsTo(Email, {
    foreignKey: 'emailId',
    as: 'email'
});

User.belongsTo(Names, {
    foreignKey: 'nameId',
    as: 'name'
});

//ReceiptFunds
ReceiptFunds.belongsTo(ReceiptAmount,
    {
        foreignKey: 'receiptAmountId',
        as: 'receipt_amount'
    });

ReceiptFunds.belongsTo(Donors,
    {
        foreignKey: 'donorId',
        as: 'donors'
    });

ReceiptFunds.belongsTo(CurrencySaleProceeds,
    {
        foreignKey: 'currencySaleProceedsId',
        as: 'currency_sale_proceeds'
    });

ReceiptFunds.belongsTo(AccountingEntry,
    {
        foreignKey: 'accountingEntryId',
        as: 'accounting_entry'
    });

//ReceiptAmount
ReceiptAmount.belongsTo(ReceiptAmountName,
    {
        foreignKey: 'receiptNameId',
        as: 'receiptName'
    });

ReceiptAmount.belongsTo(CurrencyName,
    {
        foreignKey: 'currencyNameId',
        as: 'currencyName'
    });

//Donors
Donors.belongsTo(DonorsName,
    {
        foreignKey: 'donorNameId',
        as: 'donorName'
    });

export {
    Email, User,
    ReceiptFunds,
    ReceiptAmount,
    ReceiptAmountName,
    CurrencyName,
    Donors,
    DonorsName,
    CurrencySaleProceeds,
    AccountingEntry, sequelize, storagePath
};