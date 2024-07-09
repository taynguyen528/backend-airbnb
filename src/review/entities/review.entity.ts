import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { ListRoom } from 'src/list-room/entities/list-room.entity';
import { User } from 'src/users/entities/user.entity';

@Table({
  tableName: 'review',
  timestamps: false,
})
export class Review extends Model<Review> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  reviewId: number;

  @ForeignKey(() => ListRoom)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  listingId: number;

  @BelongsTo(() => ListRoom)
  listing: ListRoom;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  })
  rating: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  comment: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  reviewDate: Date;
}
