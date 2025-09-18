import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNumber, IsString, Max, Min } from 'class-validator';
import { CarType } from '../enums/car-type.enum';

export class SearchCarsDto {
  @IsString({ message: 'Nome deve ser um texto' })
  name: string;

  @IsEnum(CarType, { message: 'Tipo deve ser um valor válido', each: true })
  type: CarType[];

  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 1 },
    { message: 'Motor deve ser número com 1 casa decimal', each: true },
  )
  @Min(0.0, { message: 'Motor mínimo é 0.0', each: true })
  engine: number[];

  @Type(() => Number)
  @IsInt({ message: 'Tamanho deve ser um número inteiro', each: true })
  @Min(1, { message: 'Tamanho mínimo é 1', each: true })
  @Max(20, { message: 'Tamanho máximo é 20', each: true })
  size: number[];
}

export class SearchCarsPartialDto extends PartialType(SearchCarsDto) {}
