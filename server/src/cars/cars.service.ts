import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCarDto } from './dto/create-car.dto';
import { SearchCarsPartialDto } from './dto/search-cars.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';
import { CarNotFoundException } from './exception/car-not-found.exception';

@Injectable()
export class CarsService {
  constructor(@InjectModel(Car.name) private carModel: Model<Car>) {}

  async create(createCarDto: CreateCarDto) {
    const car = await this.carModel.create(createCarDto);
    return car.save();
  }

  async findAll(query?: SearchCarsPartialDto) {
    const filters: Record<string, any> = { isReserved: false };
    if (!query) {
      return await this.carModel.find({ isReserved: false });
    }
    if (query.name) {
      filters.name = { $regex: query.name, $options: 'i' };
    }
    if (query.type && query.type.length > 0) {
      filters.type = { $in: query.type };
    }
    if (query.engine && query.engine.length > 0) {
      filters.engine = { $in: query.engine };
    }
    if (query.size && query.size.length > 0) {
      filters.size = { $in: query.size };
    }
    return this.carModel.find(filters);
  }

  async findOne(id: string) {
    const car = await this.carModel.findById(id);
    if (!car) {
      throw new CarNotFoundException();
    }
    return car;
  }

  async update(id: string, updateCarDto: UpdateCarDto) {
    await this.findOne(id);
    return await this.carModel.findByIdAndUpdate(id, updateCarDto, {
      new: true,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.carModel.findByIdAndDelete(id);
  }

  async setIsReserved(id: string, isReserved: boolean) {
    await this.findOne(id);
    return await this.carModel.findByIdAndUpdate(
      id,
      { isReserved },
      {
        new: true,
      },
    );
  }
}
