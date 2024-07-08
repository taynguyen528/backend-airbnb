import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment)
    private paymentModel: typeof Payment,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.paymentModel.create(createPaymentDto);
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentModel.findAll();
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentModel.findByPk(id);
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    return payment;
  }

  // async update(
  //   id: number,
  //   updatePaymentDto: UpdatePaymentDto,
  // ): Promise<Payment> {
  //   const payment = await this.findOne(id);
  //   await payment.update(updatePaymentDto);
  //   return payment;
  // }

  // async remove(id: number): Promise<void> {
  //   const payment = await this.findOne(id);
  //   await payment.destroy();
  // }
}
