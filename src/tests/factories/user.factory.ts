import { faker } from '@faker-js/faker';
import { User } from 'data/models';
const { datatype } = faker;

interface UserDict {
  enabled?: boolean;
  roles?: string[];
}

const buildUser = async (userFks: any) => {
  const resUser: UserDict = {};

  resUser.enabled = datatype.boolean();

  if (userFks.roles !== null || typeof userFks.roles !== 'undefined') {
    resUser.roles = userFks.roles;
  }

  return resUser;
};

const createUser = async (fakeUser) => {
  const user = await User.create(fakeUser);
  return user;
};

export { buildUser, createUser };
