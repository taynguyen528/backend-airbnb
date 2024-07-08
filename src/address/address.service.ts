// src/address/address.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address)
    private addressModel: typeof Address,
  ) {}

  async createNewAddress(createAddressDto: CreateAddressDto): Promise<Address> {
    const { street, city, state, zipCode, country } = createAddressDto;

    const newAddress = await this.addressModel.create({
      street,
      city,
      state,
      zipCode,
      country,
    });

    return newAddress;
  }

  async findAllAddress(): Promise<Address[]> {
    return this.addressModel.findAll();
  }

  async findOneAddressById(addressId: number): Promise<Address> {
    const address = await this.addressModel.findByPk(addressId);

    if (!address) {
      throw new NotFoundException(`Address không tồn tại!`);
    }

    return address;
  }

  async updateAddress(updateAddressDto: UpdateAddressDto): Promise<Address> {
    const { addressId, ...updateFields } = updateAddressDto;

    const [updatedCount] = await this.addressModel.update(
      { ...updateFields },
      { where: { addressId }, returning: true },
    );

    if (updatedCount === 0) {
      throw new NotFoundException(
        `Address với addressID: ${addressId} không tìm thấy`,
      );
    }

    const updatedAddress = await this.addressModel.findByPk(addressId);

    return updatedAddress;
  }

  async removeAddress(addressId: number): Promise<string> {
    const address = await this.addressModel.findOne({
      where: {
        addressId,
      },
    });

    if (!address) {
      throw new NotFoundException(
        `Không tìm thấy addressId với ${addressId}. Không thể xóa!`,
      );
    }
    await this.addressModel.destroy({ where: { addressId }, force: false });

    return `Đã xóa thành công!`;
  }

  async restore(addressId: number): Promise<string> {
    const address = await this.addressModel.findOne({
      where: { addressId },
      paranoid: false,
    });

    if (!address) {
      throw new NotFoundException(
        `Không tìm thấy address, không thể khôi phục!`,
      );
    }

    await this.addressModel.restore({ where: { addressId } });
    return `Đã khôi phục thành công.`;
  }
}
