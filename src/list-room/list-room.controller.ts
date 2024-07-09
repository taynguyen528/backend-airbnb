import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ListRoomService } from './list-room.service';
import { CreateListRoomDto } from './dto/create-list-room.dto';
import { UpdateListRoomDto } from './dto/update-list-room.dto';
import { ResponseMessage } from 'src/decorator/customize';

@Controller('list-rooms')
export class ListRoomController {
  constructor(private readonly listRoomService: ListRoomService) {}

  @Post()
  @ResponseMessage('Create ListRoom')
  create(@Body() createListRoomDto: CreateListRoomDto) {
    return this.listRoomService.create(createListRoomDto);
  }

  @Get()
  @ResponseMessage('Get all ListRoom')
  findAll() {
    return this.listRoomService.findAll();
  }

  @Get(':id')
  @ResponseMessage('Find ListRoom By Id')
  findOne(@Param('id') id: string) {
    return this.listRoomService.findOne(+id);
  }

  @Put(':id')
  @ResponseMessage('Update ListRoom')
  update(
    @Param('id') id: number,
    @Body() updateListRoomDto: UpdateListRoomDto,
  ) {
    return this.listRoomService.update(id, updateListRoomDto);
  }

  @Delete(':id')
  @ResponseMessage('Delete ListRoom')
  remove(@Param('id') id: number) {
    return this.listRoomService.remove(id);
  }
}
