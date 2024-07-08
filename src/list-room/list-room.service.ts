import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ListRoom } from './entities/list-room.entity';
import { CreateListRoomDto } from './dto/create-list-room.dto';
import { UpdateListRoomDto } from './dto/update-list-room.dto';
import { Address } from 'src/address/entities/address.entity';

@Injectable()
export class ListRoomService {
  constructor(
    @InjectModel(ListRoom)
    private listRoomModel: typeof ListRoom,
  ) {}

  async create(createListRoomDto: CreateListRoomDto): Promise<ListRoom> {
    const { addressId } = createListRoomDto;

    const addressExists = await Address.findByPk(addressId);
    if (!addressExists) {
      throw new Error(`Address with id ${addressId} does not exist.`);
    }

    return this.listRoomModel.create(createListRoomDto);
  }

  async findAll(): Promise<ListRoom[]> {
    return this.listRoomModel.findAll({
      include: [{ all: true }],
    });
  }

  async findOne(id: number): Promise<ListRoom> {
    return this.listRoomModel.findOne({
      where: { listingId: id },
      include: [{ all: true }],
    });
  }

  async update(
    id: number,
    updateListRoomDto: UpdateListRoomDto,
  ): Promise<ListRoom> {
    await this.listRoomModel.update(updateListRoomDto, {
      where: { listingId: id },
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.listRoomModel.destroy({
      where: { listingId: id },
    });
  }
}
