import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { ListRoom } from 'src/list-room/entities/list-room.entity';

@Table({
  tableName: 'address',
  timestamps: true,
  paranoid: true,
})
export class Address extends Model<Address> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  addressId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  street: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  state: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  zipCode: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  country: string;

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

  @HasMany(() => ListRoom)
  listRooms: ListRoom[];
}
