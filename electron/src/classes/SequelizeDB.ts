import { Association, FindOptions, Includeable, Model, ModelStatic, Sequelize } from 'sequelize';
import { DbInfo } from 'Types/sequelizeDBTypes';
import { UserAttributes } from 'Types/index';
import models from '../lib/sequelize/models';
import { User, sequelize, storagePath } from '../lib/sequelize';

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
        associatedModels: { [key: string]: Association<Model, Model>; } = {}
    ): Promise<M> {
        const model = models[modelName] as unknown as ModelStatic<M>;

        if (!model) {
            throw new Error(`Model ${modelName} not found`);
        }

        try {
            const instance = await model.create(data as any, {
                include: Object.values(associatedModels),
            });
            return instance.get({ plain: true });;
        } catch (error) {
            console.error(`Error saving ${modelName}:`, error);
            throw error;
        }
    }

    async getModel<M extends Model>(
        modelName: keyof typeof models,
        options: FindOptions,
        associatedModels: { [key: string]: Association<Model, Model>; } = {}
    ): Promise<M | null> {
        const model = models[modelName] as unknown as ModelStatic<M>;

        if (!model) {
            throw new Error(`Model ${modelName} not found`);
        }

        try {
            const instance = await model.findOne({
                ...options,
                include: Object.values(associatedModels),
                raw: true,
            });
            return instance;
        } catch (error) {
            console.error(`Error retrieving ${modelName}:`, error);
            throw error;
        }
    }

    saveUser(data: UserAttributes): Promise<User> {
        return this.saveModel<User>('User', data, User.associations);
    }

    getUser(options: FindOptions): Promise<User | null> {
        return this.getModel<User>('User', options, User.associations);
    }


    insertData(): Promise<UserAttributes> {
        return new Promise(async (resolve, reject) => {
            const user = await this.saveUser({
                name: 'John Doe',
                email: {
                    name: 'john@example.com'
                }
            });
            /*const user = await models.User.create({
                name: 'Johnny',
                email: {
                    name: 'email!'
                }
            }, {
                include: Object.values(models.User.associations)
            });

            const ourUser = await models.User.findByPk(1, {
                include: Object.values(models.User.associations),
                raw: true,
            }) as UserAttributes;*/
            const ourUser = await this.getUser({
                where: { id: 1 }
            }) as User;
            resolve(ourUser);
        });
    }


}