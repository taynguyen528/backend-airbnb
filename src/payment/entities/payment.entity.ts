import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { Reservation } from '../../reservation/entities/reservation.entity';

@Table({
  tableName: 'payment',
  timestamps: false,
})
export class Payment extends Model<Payment> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  paymentId: number;

  @ForeignKey(() => Reservation)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  reservationId: number;

  @BelongsTo(() => Reservation)
  reservation: Reservation;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  paymentMethod: string;

  @Column({
    type: DataType.ENUM('Successful', 'Failed'),
    allowNull: false,
  })
  paymentStatus: 'Successful' | 'Failed';

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  paymentDate: Date;
}
