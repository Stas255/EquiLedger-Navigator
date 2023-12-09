import { Model, DataTypes, NonAttribute, Association, ForeignKey, CreationOptional, HasOneCreateAssociationMixin, Sequelize } from 'sequelize';

export interface EmailAttributes {
  id?: number;
  name: string;
}

export interface NamesAttributes {
  name: string;
}


export interface UserAttributes {
  //id: number;
  name?: NamesAttributes;
  email?: EmailAttributes;
  nameId?:number;
}

export class User extends Model<UserAttributes> {
  declare id: CreationOptional<number>;
  //declare name: string;
  //declare createEmail: HasOneCreateAssociationMixin<Email>;

  declare email: NonAttribute<Email>;
  declare name: NonAttribute<Names>;

  declare static associations: {
    email: Association<User, Email>;
    name: Association<User, Names>;
  };

  static initModel(sequelize: Sequelize): typeof User {
    User.init({
    }, {
      //tableName: 'users',
      sequelize, // передача екземпляру sequelize
    });

    User.addHook('beforeCreate', async (user, options) => {
      // Assuming 'user' has a 'name' attribute with the name value
      let name = (user as UserAttributes).name?.name;
  
      // Check if the name already exists
      const [nameInstance] = await Names.findOrCreate({
          where: { name: name }
      });
  
      // Associate the found or created name with the user
      // You need to make sure this association is correctly established
      (user as UserAttributes).name = undefined;
      (user as UserAttributes).nameId = nameInstance.id;
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
        //unique:true
      }
    }, {
      //tableName: 'emails',
      sequelize, // передача екземпляру sequelize
    });

    return Names;
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
