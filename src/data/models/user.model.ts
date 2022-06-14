/* eslint import/no-cycle: "off" */
import { DataTypes } from 'sequelize';
import {
  Model,
  PrimaryKey,
  Column,
  Table,
  Default,
  IsUUID,
  BelongsToMany,
} from 'sequelize-typescript';
import { Role } from 'data/models';

@Table({
  freezeTableName: true,
})
export default class User extends Model {
  @PrimaryKey
  @IsUUID(4)
  @Default(DataTypes.UUIDV4)
  @Column
  userId: string;

  @Default(true)
  @Column
  enabled: boolean;

  @BelongsToMany(() => Role, 'RoleUser', 'userId', 'roleId')
  roles: Role[];
}
