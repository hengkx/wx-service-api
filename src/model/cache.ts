import { Sequelize, Model, DataTypes } from 'sequelize';

class Cache extends Model {
  public value!: string;
  public expireTime!: number;
}

export default (sequelize: Sequelize) => {
  Cache.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING(1024),
        allowNull: false,
      },
      expireTime: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize: sequelize,
    },
  );
  return Cache;
};
