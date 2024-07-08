import { PartialType } from '@nestjs/mapped-types';
import { CreateListRoomDto } from './create-list-room.dto';

export class UpdateListRoomDto extends PartialType(CreateListRoomDto) {}
