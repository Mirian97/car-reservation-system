import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CarsService } from 'src/cars/cars.service';
import { CarIsAlreadyReservedException } from 'src/reservations/exception/car-is-already-reserved.exception';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';
import { ActiveUserReservationException } from './exception/active-user-reservation.exception';
import { ReservationNotFoundException } from './exception/reservation-not-found.exception';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation.name) private reservationModel: Model<Reservation>,
    private readonly carsService: CarsService,
  ) { }

  async create(createReservationDto: CreateReservationDto) {
    const user = await this.reservationModel.findOne({
      userId: createReservationDto.userId,
      isActive: true,
    });
    if (user) {
      throw new ActiveUserReservationException();
    }
    const car = await this.carsService.findOne(createReservationDto.carId);
    if (car.isReserved) {
      throw new CarIsAlreadyReservedException();
    }
    const carId = car._id.toHexString();
    this.carsService.setIsReserved(carId, true);
    const reservation =
      await this.reservationModel.create(createReservationDto);
    return reservation.save();
  }

  async findAll() {
    return await this.reservationModel.find();
  }

  async findByUserId(id: string) {
    return await this.reservationModel.find({ userId: new Types.ObjectId(id).toHexString() });
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
      const carId = reservation?.carId?.toString()
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
