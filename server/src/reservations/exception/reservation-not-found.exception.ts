import { HttpException, HttpStatus } from '@nestjs/common';

export class ReservationNotFoundException extends HttpException {
  constructor() {
    super(
      {
        message: 'reservation.notFound',
        error: 'RESERVATION_NOT_FOUND',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
