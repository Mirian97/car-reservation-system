import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateReservationDto {
  @IsMongoId({ message: 'validation.isMongoId' })
  @IsNotEmpty({ message: 'validation.isNotEmpty' })
  userId: string;

  @IsMongoId({ message: 'validation.isMongoId' })
  @IsNotEmpty({ message: 'validation.isNotEmpty' })
  carId: string;

  @IsOptional()
  @IsDateString({}, { message: 'validation.isDateString' })
  reservedAt?: string;
}
