import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'User',
  timestamps: true,
  paranoid: true,
})
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  userId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  passWord: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phoneNumber: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  birthDay: Date;

  @Column({
    type: DataType.ENUM('Male', 'Female', 'Other'),
    allowNull: true,
  })
  gender: string;

  @Column({
    type: DataType.ENUM('Host', 'Guest'),
    allowNull: false,
  })
  userType: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  deletedAt: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    allowNull: false,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    allowNull: false,
  })
  updatedAt: Date;
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

export enum UserType {
  Host = 'Host',
  Guest = 'Guest',
}
