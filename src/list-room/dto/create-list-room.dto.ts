import { IsNotEmpty, IsNumber, IsString, IsEnum } from 'class-validator';

export class CreateListRoomDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  pricePerNight: number;

  @IsEnum(['Available', 'Booked'])
  availabilityStatus: string;

  @IsNumber()
  hostId: number;

  @IsNumber()
  addressId: number;
}
