import { sequelize } from '../../data/models';

import AdminBro from 'admin-bro';
import AdminBroExpress from '@admin-bro/express';
import AdminBroSequelize from '@admin-bro/sequelize';

AdminBro.registerAdapter(AdminBroSequelize);
const adminBro = new AdminBro({
  rootPath: '/admin',
  resources: [
    {
      resource: sequelize.models.Role,
      options: {
        parent: {
          name: 'Database',
          icon: 'Api',
        },
        listProperties: ['roleId', 'name'],
      },
    },
    {
      resource: sequelize.models.User,
      options: {
        parent: {
          name: 'Database',
          icon: 'Api',
        },
        listProperties: ['userId', 'enabled'],
      },
    },
  ],
  branding: {
    companyName: 'Database dashboard',
    softwareBrothers: false,
    logo: false,
    favicon: 'https://imagine.ai/img/favicon.ico',
  },
});
const adminbroRouter = AdminBroExpress.buildRouter(adminBro);

export default adminbroRouter;
