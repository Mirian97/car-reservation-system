import { IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'validation.email' })
  email: string;

  @MinLength(6, { message: 'validation.minLength' })
  password: string;
}
