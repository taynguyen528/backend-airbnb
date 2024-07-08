import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { ListRoom } from 'src/list-room/entities/list-room.entity';
import { User } from 'src/users/entities/user.entity';

@Table({
  tableName: 'reservation',
})
export class Reservation extends Model<Reservation> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  reservationId: number;

  @ForeignKey(() => ListRoom)
  @Column(DataType.INTEGER)
  listingId: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  guestId: number;

  @Column(DataType.DATE)
  checkInDate: Date;

  @Column(DataType.DATE)
  checkOutDate: Date;

  @Column(DataType.FLOAT)
  totalPrice: number;

  @Column(DataType.STRING)
  reservationStatus: string;
}
