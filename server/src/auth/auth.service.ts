import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { EmailInUseException } from 'src/users/exception/email-in-use.exception';
import { InvalidCredentialsException } from 'src/users/exception/invalid-credentials-exception';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from '../users/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  private async generateToken(user: UserDocument): Promise<string> {
    return await this.jwtService.signAsync({
      id: user._id,
      name: user.name,
      roles: user.roles,
    });
  }

  async signUp({
    name,
    email,
    password,
  }: CreateUserDto): Promise<{ token: string }> {
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new EmailInUseException();
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userService.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = await this.generateToken(user);
    return { token };
  }

  async login({ email, password }: LoginDto): Promise<{ token: string }> {
    const user = await this.userModel.findOne({ email }).select('+password');
    if (!user) {
      throw new InvalidCredentialsException();
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new InvalidCredentialsException();
    }
    const token = await this.generateToken(user);
    return { token };
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    const user = await this.userService.findOne(id, true);
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    if (updateUserDto.email) {
      const existingUser = await this.userModel.findOne({
        email: updateUserDto.email,
      });
      if (existingUser && !existingUser._id.equals(id)) {
        throw new EmailInUseException();
      }
    }
    Object.assign(user, updateUserDto);
    return await this.userService.update(id, user);
  }
}
