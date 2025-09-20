import { ObjectId } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export type JwtPayload = {
  id: ObjectId;
  name: string;
  roles: string[];
};

export type AuthResponse = {
  token: string;
  user: Omit<User, 'password'>;
};
