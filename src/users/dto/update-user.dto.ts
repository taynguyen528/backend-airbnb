import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends OmitType(CreateUserDto, [
  'passWord',
] as const) {
  userId: number;
}

//OmitType không muốn cập nhật trường nào thì dùng OmitType
