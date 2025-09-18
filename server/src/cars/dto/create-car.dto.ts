import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNumber, IsString, Max, Min } from 'class-validator';
import { CarType } from '../enums/car-type.enum';

export class CreateCarDto {
  @IsString({ message: 'validation.isString' })
  name: string;

  @Type(() => Number)
  @IsInt({ message: 'validation.isNumber' })
  @Min(1980, { message: 'validation.min' })
  @Max(new Date().getFullYear(), { message: 'validation.max' })
  year: number;

  @IsEnum(CarType, { message: 'validation.isEnum' })
  type: CarType;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 1 }, { message: 'validation.isNumber' })
  @Min(0.0, { message: 'validation.min' })
  engine: number;

  @Type(() => Number)
  @IsInt({ message: 'validation.isNumber' })
  @Min(1, { message: 'validation.min' })
  @Max(20, { message: 'validation.max' })
  size: number;
}
