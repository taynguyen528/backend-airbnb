import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ResponseMessage } from 'src/decorator/customize';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @ResponseMessage('Add new address')
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.createNewAddress(createAddressDto);
  }

  @Get()
  @ResponseMessage('Find all address')
  findAll() {
    return this.addressService.findAllAddress();
  }

  @Get(':addressId')
  @ResponseMessage('Find address by addressId')
  findOne(@Param('addressId') addressId: number) {
    return this.addressService.findOneAddressById(addressId);
  }

  @Patch()
  @ResponseMessage('Update address by addressId')
  update(@Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.updateAddress(updateAddressDto);
  }

  @Delete(':addressId')
  @ResponseMessage('Remove address')
  remove(@Param('addressId') addressId: number) {
    return this.addressService.removeAddress(addressId);
  }

  @Patch('restore/:addressId')
  @ResponseMessage('Restore address by addressId')
  async restore(@Param('addressId') addressId: number): Promise<string> {
    return this.addressService.restore(addressId);
  }
}
