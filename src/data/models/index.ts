/* eslint import/no-cycle: "off" */
import { Sequelize } from 'sequelize-typescript';
import config from 'config';

import Role from './role.model';
import User from './user.model';
const pg = require('pg');

// https://github.com/sequelize/sequelize/issues/4550
pg.defaults.parseInt8 = true;

const sequelize = new Sequelize({
  ...config,
  models: [Role, User],
});

if (process.env.NODE_ENV !== 'test' && !process.env.USE_MIGRATIONS) {
  sequelize.sync({ alter: true });
}

export { sequelize, Role, User };
