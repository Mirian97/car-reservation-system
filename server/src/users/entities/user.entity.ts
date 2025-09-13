import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/roles/enums/role.enum';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ type: [String], enum: Role, default: [Role.User] })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
