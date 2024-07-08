import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { Address } from 'src/address/entities/address.entity';
import { User } from 'src/users/entities/user.entity';

@Table({
  tableName: 'listroom',
})
export class ListRoom extends Model<ListRoom> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  listingId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
  })
  description: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  pricePerNight: number;

  @Column({
    type: DataType.ENUM('Available', 'Booked'),
    allowNull: false,
  })
  availabilityStatus: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  hostId: number;

  @ForeignKey(() => Address)
  @Column({
    type: DataType.INTEGER,
  })
  addressId: number;

  @BelongsTo(() => User)
  host: User;

  @BelongsTo(() => Address)
  address: Address;
}
