import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ResponseMessage } from 'src/decorator/customize';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ResponseMessage('Create Payment')
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  @ResponseMessage('Get All Payment')
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  @ResponseMessage('Get Payment By ID')
  findOne(@Param('id') id: number) {
    return this.paymentService.findOne(id);
  }

  // @Put(':id')
  // update(@Param('id') id: number, @Body() updatePaymentDto: UpdatePaymentDto) {
  //   return this.paymentService.update(id, updatePaymentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: number) {
  //   return this.paymentService.remove(id);
  // }
}
