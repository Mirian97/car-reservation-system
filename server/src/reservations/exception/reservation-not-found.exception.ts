import { HttpException, HttpStatus } from '@nestjs/common';

export class ReservationNotFoundException extends HttpException {
  constructor() {
    super(
      {
        message: 'Reservation not found',
        error: 'RESERVATION_NOT_FOUND',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
