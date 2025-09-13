import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNumber, IsString, Max, Min } from 'class-validator';
import { CarType } from '../enums/car-type.enum';

export class CreateCarDto {
  @IsString()
  name: string;

  @Type(() => Number)
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  year: number;

  @IsEnum(CarType)
  type: CarType;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(0.0)
  engine: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(20)
  size: number;
}
