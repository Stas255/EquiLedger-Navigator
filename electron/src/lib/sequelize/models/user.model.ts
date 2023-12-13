import { Model, DataTypes, NonAttribute, Association, ForeignKey, CreationOptional, HasOneCreateAssociationMixin, Sequelize } from 'sequelize';

export interface EmailAttributes {
  id?: number;
  name: string;
}

export interface NamesAttributes {
  name: string;
}


export interface UserAttributes {
  name?: NamesAttributes;
  email:EmailAttributes;
  nameId:number;
}

export class User extends Model<Omit<UserAttributes, 'email'>, Omit<UserAttributes, 'id'>>  {
  declare id: CreationOptional<number>;
  declare nameId: number;

  declare email: NonAttribute<Email>;
  declare name: NonAttribute<Names>;

  declare static associations: {
    email: Association<User, Email>;
    name: Association<User, Names>;
  };

  static initModel(sequelize: Sequelize): typeof User {
    User.init({
      nameId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      }
    }, {
      //tableName: 'users',
      sequelize, // передача екземпляру sequelize
    });

    return User;
  }
}

export class Names extends Model<Omit<NamesAttributes, 'userId'>, Omit<NamesAttributes, 'id'>> {
  declare id: CreationOptional<number>;
  declare name: string;

  static initModel(sequelize: Sequelize): typeof Names {
    Names.init({
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      }
    }, {
      sequelize,
    });

    return Names;
  }
}


export class Email extends Model<Omit<EmailAttributes, 'userId'>, Omit<EmailAttributes, 'id'>> {
  declare id: CreationOptional<number>;
  declare name: string;

  static initModel(sequelize: Sequelize): typeof Email {
    Email.init({
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      }
    }, {
      sequelize,
    });

    return Email;
  }
}
