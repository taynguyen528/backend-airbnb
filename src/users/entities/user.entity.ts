import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'User' })
export class User extends Model<User> {
  @Column({ primaryKey: true, autoIncrement: true })
  userId: number;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false, unique: true })
  email: string;

  @Column({ allowNull: false })
  passWord: string;

  @Column({ allowNull: true })
  phoneNumber: string;

  @Column({ allowNull: true, type: DataType.DATEONLY })
  birthDay: Date;

  @Column({ allowNull: true, type: DataType.ENUM('Male', 'Female', 'Other') })
  gender: 'Male' | 'Female' | 'Other';

  @Column({ allowNull: false, type: DataType.ENUM('Host', 'Guest') })
  userType: 'Host' | 'Guest';
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
