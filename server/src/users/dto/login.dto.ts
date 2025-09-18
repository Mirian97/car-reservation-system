import { IsEmail, MinLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class LoginDto {
  @IsEmail({}, { message: i18nValidationMessage('validation.email') })
  email: string;

  @MinLength(6, { message: i18nValidationMessage('validation.minLength') })
  password: string;
}
