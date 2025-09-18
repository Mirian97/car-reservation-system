import { HttpException, HttpStatus } from '@nestjs/common';

export class CarIsAlreadyReservedException extends HttpException {
  constructor() {
    super(
      {
        message: 'Carro já está reservado',
        error: 'CAR_IS_ALREADY_RESERVED',
      },
      HttpStatus.CONFLICT,
    );
  }
}
