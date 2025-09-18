import { ObjectId } from 'mongoose';

export type JwtPayload = {
  id: ObjectId;
  name: string;
  roles: string[];
};
