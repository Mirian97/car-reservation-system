import { Module } from '@nestjs/common';
import { CarsService } from 'src/cars/cars.service';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';

@Module({
  controllers: [ReservationsController],
  providers: [ReservationsService, CarsService],
})
export class ReservationsModule {}
