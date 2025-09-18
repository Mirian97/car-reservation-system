import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailInUseException extends HttpException {
  constructor() {
    super(
      {
        message: 'user.emailInUse',
        error: 'EMAIL_IN_USE',
      },
      HttpStatus.CONFLICT,
    );
  }
}
