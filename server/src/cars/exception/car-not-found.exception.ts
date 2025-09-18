import { HttpException, HttpStatus } from '@nestjs/common';

export class CarNotFoundException extends HttpException {
  constructor() {
    super(
      {
        message: 'Carro não encontrado',
        error: 'CAR_NOT_FOUND',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
