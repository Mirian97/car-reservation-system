import { HttpException, HttpStatus } from '@nestjs/common';

export class CarIsAlreadyReservedException extends HttpException {
  constructor() {
    super(
      {
        message: 'reservation.carAlreadyReserved',
        error: 'CAR_IS_ALREADY_RESERVED',
      },
      HttpStatus.CONFLICT,
    );
  }
}
