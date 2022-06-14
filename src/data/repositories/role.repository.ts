import { Role, User } from 'data/models';
import { NotFound } from 'server/utils/errors';

export default class RoleRepository {
  static async create(createBody: { name?: string; users?: User[] }) {
    const createdRole: Role = new Role(createBody);

    if (createBody.users) createdRole.$set('users', createBody.users);

    return createdRole.save();
  }

  static get(roleId: string) {
    return Role.findByPk(roleId, { include: ['users'] });
  }

  static getAll(filters: any) {
    return Role.findAll({
      where: filters,
      include: ['users'],
    });
  }

  static async update(updateBody: { roleId: string; name: string; users: User[] }) {
    return this.partialUpdate(updateBody);
  }

  static async partialUpdate(updateBody: { roleId: string; name?: string; users?: User[] }) {
    const foundRole = await Role.findByPk(updateBody.roleId);
    if (!foundRole) throw new NotFound(`Role with primary key ${updateBody.roleId} not found`);
    if (updateBody.name !== undefined) foundRole.name = updateBody.name;
    if (updateBody.users !== undefined) foundRole.$set('users', updateBody.users);
    await foundRole.save();
    return foundRole.reload();
  }

  static async destroy(roleId: string) {
    const foundRole = await Role.findByPk(roleId);
    if (!foundRole) throw new NotFound(`Role with primary key ${roleId} not found`);
    await foundRole.destroy();
    return foundRole;
  }
}
