import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNumber, IsString, Max, Min } from 'class-validator';
import { CarType } from '../enums/car-type.enum';

export class CreateCarDto {
  @IsString({ message: 'Nome deve ser um texto' })
  name: string;

  @Type(() => Number)
  @IsInt({ message: 'Ano deve ser um número inteiro' })
  @Min(1900, { message: 'Ano mínimo é 1900' })
  @Max(new Date().getFullYear(), {
    message: `Ano máximo é ${new Date().getFullYear()}`,
  })
  year: number;

  @IsEnum(CarType, { message: 'Tipo deve ser um valor válido' })
  type: CarType;

  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 1 },
    { message: 'Motor deve ser número com 1 casa decimal' },
  )
  @Min(0.0, { message: 'Motor mínimo é 0.0' })
  engine: number;

  @Type(() => Number)
  @IsInt({ message: 'Tamanho deve ser um número inteiro' })
  @Min(1, { message: 'Tamanho mínimo é 1' })
  @Max(20, { message: 'Tamanho máximo é 20' })
  size: number;
}
