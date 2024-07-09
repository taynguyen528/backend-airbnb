import { Type } from 'class-transformer';
import { IsInt, IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateReservationDto {
  @IsInt()
  reservationId: number;

  @IsOptional()
  @IsInt()
  listingId?: number;

  @IsOptional()
  @IsInt()
  guestId?: number;

  @IsOptional()
  @Type(() => Date)
  checkInDate?: Date;

  @IsOptional()
  @Type(() => Date)
  checkOutDate?: Date;

  @IsOptional()
  @IsNumber()
  totalPrice?: number;

  @IsOptional()
  @IsString()
  reservationStatus?: string;
}
