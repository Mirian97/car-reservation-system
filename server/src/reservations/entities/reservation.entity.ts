import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export class Reservation {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'Car',
    required: true,
  })
  carId: Types.ObjectId;

  @Prop({
    required: true,
    default: true,
  })
  isActive: boolean;

  @Prop({
    required: true,
    default: Date.now,
  })
  reservedAt: Date;

  @Prop()
  releasedAt?: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);

ReservationSchema.index({ userId: 1 });
ReservationSchema.index({ carId: 1 });
ReservationSchema.index({ isActive: 1 });
ReservationSchema.index(
  { userId: 1, isActive: 1 },
  {
    unique: true,
    partialFilterExpression: { isActive: true },
  },
);
ReservationSchema.index(
  { carId: 1, isActive: 1 },
  {
    unique: true,
    partialFilterExpression: { isActive: true },
  },
);
