import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(createReservationDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.update(id, updateReservationDto);
  }

  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  @Get('user/:id')
  findByUserId(@Param('id', ParseObjectIdPipe) id: string) {
    return this.reservationsService.findByUserId(id);
  }

  @Get('car/:id')
  findOneCarAndActiveReservation(@Param('id', ParseObjectIdPipe) id: string) {
    return this.reservationsService.findOneCarAndActiveReservation(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.reservationsService.findOne(id);
  }
}
