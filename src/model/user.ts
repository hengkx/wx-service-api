import { Sequelize, Model, DataTypes } from 'sequelize';

class User extends Model {
  public openId!: string;
}

export default (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      deviceId: {
        type: new DataTypes.STRING(128),
      },
      openId: {
        type: new DataTypes.STRING(256),
      },
    },
    {
      sequelize: sequelize,
    },
  );
  return User;
};
