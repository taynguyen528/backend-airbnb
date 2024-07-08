import { IsInt, IsString, IsDate, IsNotEmpty, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReviewDto {
  @IsInt()
  listingId: number;

  @IsInt()
  userId: number;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsDate()
  @Type(() => Date)
  reviewDate: Date;
}
