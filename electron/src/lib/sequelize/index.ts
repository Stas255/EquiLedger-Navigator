import { Email, User } from "./models/user.model";
import path from "node:path";
import { app } from 'electron';
import { Sequelize } from "sequelize";

const storagePath = app.isPackaged ? path.join(path.dirname(app.getPath('exe')), '/db/local-database.sqlite') : path.join(__dirname, '/db/local-database.sqlite');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: storagePath
});


User.initModel(sequelize);
Email.initModel(sequelize);

User.hasOne(Email,
    {
        foreignKey: 'userId',
        as: 'email'
    });

export { User, Email, sequelize, storagePath };