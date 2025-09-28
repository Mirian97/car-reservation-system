import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserNotFoundException } from './exception/user-not-found.exception';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.create(createUserDto);
    return user.save();
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOne(id: string, withPassword: boolean = false) {
    const user = await this.userModel
      .findById(id)
      .select(withPassword ? '+password' : '-password')
      .exec();
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    return await this.userModel
      .findByIdAndUpdate(id, updateUserDto, {
        new: true,
      })
      .exec();
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.userModel.findByIdAndDelete(id).exec();
  }
}
