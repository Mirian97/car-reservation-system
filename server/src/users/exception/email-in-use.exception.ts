import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailInUseException extends HttpException {
  constructor() {
    super(
      {
        message: 'E-mail already registered',
        error: 'EMAIL_IN_USE',
      },
      HttpStatus.CONFLICT,
    );
  }
}
