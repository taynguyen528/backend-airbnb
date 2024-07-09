import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ResponseMessage } from 'src/decorator/customize';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @ResponseMessage('Create reservation')
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.createReservation(createReservationDto);
  }

  @Get()
  @ResponseMessage('Get all reservation')
  findAll() {
    return this.reservationService.findAllReservations();
  }

  @Get(':id')
  @ResponseMessage('Get reservation by id')
  findOne(@Param('id') id: number) {
    return this.reservationService.findReservationById(id);
  }

  @Put(':id')
  @ResponseMessage('Update reservation')
  update(
    @Param('id') id: number,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    updateReservationDto.reservationId = id;
    return this.reservationService.updateReservation(updateReservationDto);
  }

  @Delete(':id')
  @ResponseMessage('Delete reservation')
  remove(@Param('id') id: number) {
    return this.reservationService.removeReservation(id);
  }
}
