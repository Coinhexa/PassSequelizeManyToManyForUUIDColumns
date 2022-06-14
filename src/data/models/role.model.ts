/* eslint import/no-cycle: "off" */
import { DataTypes } from 'sequelize';
import {
  Model,
  PrimaryKey,
  Column,
  Table,
  Length,
  Default,
  IsUUID,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from 'data/models';

@Table({
  freezeTableName: true,
})
export default class Role extends Model {
  @PrimaryKey
  @IsUUID(4)
  @Default(DataTypes.UUIDV4)
  @Column
  roleId: string;

  @Length({ min: 0, max: 255 })
  @Column
  name: string;

  @BelongsToMany(() => User, 'RoleUser', 'roleId', 'userId')
  users: User[];
}
