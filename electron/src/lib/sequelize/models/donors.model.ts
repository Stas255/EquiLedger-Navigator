/*export interface DonorsAttributes {
    name: DonorsNameAttributes; // назва
    payment_purpose: string; //Призначення платежу
} */

import { DonorsAttributes } from "Types/sequelizeDBTypes";
import { Association, CreationOptional, DataTypes, Model, NonAttribute, Sequelize } from "sequelize";
import { DonorsName } from "./donorsName.model";

export class Donors
    extends Model<Omit<DonorsAttributes, 'name'>,
        Omit<DonorsAttributes, 'id'>> {
    declare id: CreationOptional<number>;
    declare payment_purpose: string;

    declare name: NonAttribute<DonorsName>;

    declare static associations: {
        name: Association<Donors, DonorsName>;
    }

    static initModel(sequelize: Sequelize): typeof Donors {
        Donors.init({
            payment_purpose: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        }, {
            sequelize, // передача екземпляру sequelize
        });

        return Donors;
    }
}