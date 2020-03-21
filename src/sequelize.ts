import { Sequelize } from 'sequelize';
import CacheModel from './model/cache';
import UserModel from './model/user';
import config from './config';

const sequelize = new Sequelize(config.connectionUrl, {
  logging: false,
  timezone: '+08:00',
  define: {
    timestamps: true,
    underscored: true,
  },
  dialectOptions: {
    decimalNumbers: true,
  },
});

export const Cache = CacheModel(sequelize);
export const User = UserModel(sequelize);

sequelize.sync({}).then(() => {
  console.log(`Database & tables created!`);
});

export default sequelize;
