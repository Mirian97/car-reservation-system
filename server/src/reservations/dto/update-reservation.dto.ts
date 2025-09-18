import { IsBoolean, IsDateString, IsOptional } from 'class-validator';

export class UpdateReservationDto {
  @IsBoolean({ message: 'validation.boolean' })
  @IsOptional()
  isActive?: boolean;

  @IsOptional()
  @IsDateString({}, { message: 'validation.isDateString' })
  releasedAt?: Date;
}
