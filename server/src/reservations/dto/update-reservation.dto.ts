import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateReservationDto {
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsOptional()
  releasedAt?: Date;
}
