import { Type } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsString,
  IsEnum,
  IsDate,
  IsPositive,
} from 'class-validator';

export class CreatePaymentDto {
  @IsInt()
  reservationId: number;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  paymentMethod: string;

  @IsEnum(['Successful', 'Failed'])
  paymentStatus: 'Successful' | 'Failed';

  @IsDate()
  @Type(() => Date)
  paymentDate: Date;
}
