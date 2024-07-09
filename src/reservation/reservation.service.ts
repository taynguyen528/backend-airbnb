// src/reservation/reservation.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation)
    private reservationModel: typeof Reservation,
  ) {}

  async createReservation(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    const {
      listingId,
      guestId,
      checkInDate,
      checkOutDate,
      totalPrice,
      reservationStatus,
    } = createReservationDto;

    const newReservation = await this.reservationModel.create({
      listingId,
      guestId,
      checkInDate: new Date(checkInDate),
      checkOutDate: new Date(checkOutDate),
      totalPrice,
      reservationStatus,
    });

    return newReservation;
  }

  async findAllReservations(): Promise<Reservation[]> {
    return this.reservationModel.findAll();
  }

  async findReservationById(reservationId: number): Promise<Reservation> {
    const reservation = await this.reservationModel.findByPk(reservationId);
    if (!reservation) {
      throw new NotFoundException(
        `Reservation with ID ${reservationId} not found.`,
      );
    }
    return reservation;
  }

  async updateReservation(
    updateReservationDto: UpdateReservationDto,
  ): Promise<Reservation> {
    const { reservationId, ...updateFields } = updateReservationDto;
    const [updatedCount] = await this.reservationModel.update(updateFields, {
      where: { reservationId },
    });

    if (updatedCount === 0) {
      throw new NotFoundException(
        `Reservation with ID ${reservationId} not found.`,
      );
    }

    return this.findReservationById(reservationId);
  }

  async removeReservation(reservationId: number): Promise<string> {
    const deletedCount = await this.reservationModel.destroy({
      where: { reservationId },
    });
    if (deletedCount === 0) {
      throw new NotFoundException(
        `Reservation with ID ${reservationId} not found.`,
      );
    }
    return 'Xử lý thành công.';
  }
}
