import { HttpException, HttpStatus } from '@nestjs/common';

export class ActiveUserReservationException extends HttpException {
  constructor() {
    super(
      {
        message: 'Usuário possui uma reserva ativa',
        error: 'USER_HAS_ACTIVE_RESERVATION',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
