import {
  IsInt,
  IsString,
  IsDate,
  IsNotEmpty,
  Min,
  Max,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateReviewDto {
  @IsOptional()
  @IsInt()
  listingId?: number;

  @IsOptional()
  @IsInt()
  userId?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  comment?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  reviewDate?: Date;
}
