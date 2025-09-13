import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CarsService } from 'src/cars/cars.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';
import { ReservationNotFoundException } from './exception/reservation-not-found.exception';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation.name) private reservationModel: Model<Reservation>,
    private readonly carsService: CarsService,
  ) {}

  async create(createReservationDto: CreateReservationDto) {
    const reservation =
      await this.reservationModel.create(createReservationDto);
    return reservation.save();
  }

  async findAll() {
    return await this.reservationModel.find();
  }

  async findByUserId(id: string) {
    return await this.reservationModel.find({ user: id });
  }

  async findOne(id: string) {
    const reservation = await this.reservationModel.findById(id);
    if (!reservation) {
      throw new ReservationNotFoundException();
    }
    return reservation;
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {
    const reservation = await this.findOne(id);
    if (updateReservationDto.isActive === false) {
      const carId = reservation.carId._id.toHexString();
      await this.carsService.setIsReserved(carId, false);
    }
    return await this.reservationModel.findByIdAndUpdate(
      id,
      updateReservationDto,
      {
        new: true,
      },
    );
  }
}
