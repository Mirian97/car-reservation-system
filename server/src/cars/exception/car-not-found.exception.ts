import { HttpException, HttpStatus } from '@nestjs/common';

export class CarNotFoundException extends HttpException {
  constructor() {
    super(
      {
        message: 'car.notFound',
        error: 'CAR_NOT_FOUND',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
