import {
  IsEmail,
  IsString,
  IsDateString,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { Gender, UserType } from '../entities/user.entity';

export class CreateUserDto {
  @IsString({ message: 'Name must be a letter character!' })
  @IsNotEmpty({ message: 'Name cannot be empty!' })
  name: string;

  @IsEmail({}, { message: 'Email invalidate!' })
  @IsNotEmpty({ message: 'Email cannot be empty!' })
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty!' })
  passWord: string;

  @IsString()
  @IsNotEmpty({ message: 'Phone Number cannot be empty!' })
  phoneNumber: string;

  @IsDateString({}, { message: 'Birthday must be a valid date!' })
  @IsNotEmpty({ message: 'Birthday cannot be empty!' })
  birthDay: Date;

  @IsEnum(Gender)
  @IsNotEmpty({ message: 'Gender cannot be empty!' })
  gender: Gender;

  @IsEnum(UserType)
  @IsNotEmpty({ message: 'User Type cannot be empty!' })
  userType: UserType;
}
