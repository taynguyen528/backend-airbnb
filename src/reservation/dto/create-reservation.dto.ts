import { IsInt, IsString, IsNumber, IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReservationDto {
  @IsInt()
  @IsNotEmpty()
  listingId: number;

  @IsInt()
  @IsNotEmpty()
  guestId: number;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  checkInDate: Date;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  checkOutDate: Date;

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @IsString()
  @IsNotEmpty()
  reservationStatus: string;
}
