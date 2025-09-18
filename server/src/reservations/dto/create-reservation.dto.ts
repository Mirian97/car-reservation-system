import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateReservationDto {
  @IsMongoId({ message: 'ID de usuário inválido' })
  @IsNotEmpty({ message: 'ID de usuário é obrigatório' })
  userId: string;

  @IsMongoId({ message: 'ID de carro inválido' })
  @IsNotEmpty({ message: 'ID de carro é obrigatório' })
  carId: string;

  @IsOptional()
  @IsDateString({}, { message: 'Data deve ser uma string de data válida' })
  reservedAt?: string;
}
