import { HttpException, HttpStatus } from '@nestjs/common';

export class ActiveUserReservationException extends HttpException {
  constructor() {
    super(
      {
        message: 'User has an active reservation',
        error: 'USER_HAS_ACTIVE_RESERVATION',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
