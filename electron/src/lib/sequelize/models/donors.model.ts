/*export interface DonorsAttributes {
    donorId:number;
    donor: DonorsNameAttributes; // назва
    payment_purpose: string; //Призначення платежу
} */

import { DonorsAttributes } from "Types/sequelizeDBTypes";
import { Association, CreationOptional, DataTypes, Model, NonAttribute, Sequelize } from "sequelize";
import { DonorsName } from "./donorsName.model";

export class Donors
    extends Model<Omit<DonorsAttributes, 'donorName'>,
        Omit<DonorsAttributes, 'id'>> {
    declare id: CreationOptional<number>;
    declare donorNameId: number;
    declare payment_purpose: string;

    declare donorName: NonAttribute<DonorsName>;

    declare static associations: {
        donorName: Association<Donors, DonorsName>;
    }

    static initModel(sequelize: Sequelize): typeof Donors {
        Donors.init({
            donorNameId: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
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