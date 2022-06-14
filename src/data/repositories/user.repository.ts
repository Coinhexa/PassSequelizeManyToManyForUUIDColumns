import { User, Role } from 'data/models';
import { NotFound } from 'server/utils/errors';

export default class UserRepository {
  static async create(createBody: { enabled?: boolean; roles?: Role[] }) {
    const createdUser: User = new User(createBody);

    if (createBody.roles) createdUser.$set('roles', createBody.roles);

    return createdUser.save();
  }

  static get(userId: string) {
    return User.findByPk(userId, { include: ['roles'] });
  }

  static getAll(filters: any) {
    return User.findAll({
      where: filters,
      include: ['roles'],
    });
  }

  static async update(updateBody: { userId: string; enabled: boolean; roles: Role[] }) {
    return this.partialUpdate(updateBody);
  }

  static async partialUpdate(updateBody: { userId: string; enabled?: boolean; roles?: Role[] }) {
    const foundUser = await User.findByPk(updateBody.userId);
    if (!foundUser) throw new NotFound(`User with primary key ${updateBody.userId} not found`);
    if (updateBody.enabled !== undefined) foundUser.enabled = updateBody.enabled;
    if (updateBody.roles !== undefined) foundUser.$set('roles', updateBody.roles);
    await foundUser.save();
    return foundUser.reload();
  }

  static async destroy(userId: string) {
    const foundUser = await User.findByPk(userId);
    if (!foundUser) throw new NotFound(`User with primary key ${userId} not found`);
    await foundUser.destroy();
    return foundUser;
  }
}
