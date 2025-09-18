import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCredentialsException extends HttpException {
  constructor() {
    super(
      {
        message: 'E-mail ou senha inválidos',
        error: 'INVALID_CREDENTIALS',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
