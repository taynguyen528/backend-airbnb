import { Module } from '@nestjs/common';
import { ListRoomService } from './list-room.service';
import { ListRoomController } from './list-room.controller';
import { ListRoom } from './entities/list-room.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { Address } from 'src/address/entities/address.entity';

@Module({
  imports: [SequelizeModule.forFeature([ListRoom, Address])],
  controllers: [ListRoomController],
  providers: [ListRoomService],
})
export class ListRoomModule {}
