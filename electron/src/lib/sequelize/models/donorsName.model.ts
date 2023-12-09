/*export interface DonorsNameAttributes {
    type: string // фізична особа | юридична особа | грантодавці
} */

import { DonorsNameAttributes } from "Types/sequelizeDBTypes";
import { CreationOptional, DataTypes, Model, Sequelize } from "sequelize";

export class DonorsName
    extends Model<DonorsNameAttributes,
        Omit<DonorsNameAttributes, 'id'>> {
    declare id: CreationOptional<number>;
    declare type: string;

    static initModel(sequelize: Sequelize): typeof DonorsName {
        DonorsName.init({
            type: {
                type: DataTypes.STRING,
                validate: {
                    isIn: [['фізична особа',
                        'юридична особа',
                        'грантодавці']]
                }
            },
        }, {
            sequelize, // передача екземпляру sequelize
        });

        return DonorsName;
    }
}