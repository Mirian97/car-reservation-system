import { HttpException, HttpStatus } from '@nestjs/common';

export class CarIsAlreadyReservedException extends HttpException {
  constructor() {
    super(
      {
        message: 'Car is already reserved',
        error: 'CAR_IS_ALREADY_RESERVED',
      },
      HttpStatus.CONFLICT,
    );
  }
}
