import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CarType } from '../enums/car-type.enum';

@Schema({ timestamps: true })
export class Car {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, min: 1980, max: new Date().getFullYear() })
  year: number;

  @Prop({
    required: true,
    type: String,
    enum: CarType,
  })
  type: CarType;

  @Prop({
    required: true,
    min: 0.0,
    get: (val: number) => Number(val.toFixed(1)),
  })
  engine: number;

  @Prop({ required: true, min: 1, max: 20 })
  size: number;

  @Prop({ default: false })
  isReserved: boolean;
}

export const CarSchema = SchemaFactory.createForClass(Car);
