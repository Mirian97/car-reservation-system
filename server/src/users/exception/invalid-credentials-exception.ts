import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCredentialsException extends HttpException {
  constructor() {
    super(
      {
        message: 'user.invalidCredentials',
        error: 'INVALID_CREDENTIALS',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
