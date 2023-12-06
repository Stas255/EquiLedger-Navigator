import { Model, DataTypes, NonAttribute, Association, ForeignKey, CreationOptional, HasOneCreateAssociationMixin, Sequelize } from 'sequelize';
import { EmailAttributes, UserAttributes } from 'Types/index';


export class User extends Model<Omit<UserAttributes, 'email'>, Omit<UserAttributes, 'id'>> {
  declare id: CreationOptional<number>;
  declare name: string;
  //declare createEmail: HasOneCreateAssociationMixin<Email>;

  declare email: NonAttribute<Email>;

  declare static associations: {
    email: Association<User, Email>;
  };

  static initModel(sequelize: Sequelize): typeof User {
    User.init({
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      }
    }, {
      //tableName: 'users',
      sequelize, // передача екземпляру sequelize
    });

    return User;
  }
}

export class Email extends Model<Omit<EmailAttributes, 'userId'>, Omit<EmailAttributes, 'id'>> {
  declare id: CreationOptional<number>;
  declare name: string;

  static initModel(sequelize: Sequelize): typeof Email {
    Email.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      }
    }, {
      //tableName: 'emails',
      sequelize, // передача екземпляру sequelize
    });

    return Email;
  }
}
