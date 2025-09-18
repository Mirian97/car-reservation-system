import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from 'src/roles/enums/role.enum';

export class CreateUserDto {
  @IsString({ message: 'validation.isString' })
  @IsNotEmpty({ message: 'validation.isNotEmpty' })
  name: string;

  @IsEmail({}, { message: 'validation.email' })
  @IsNotEmpty({ message: 'validation.isNotEmpty' })
  email: string;

  @MinLength(6, { message: 'validation.minLength' })
  @IsNotEmpty({ message: 'validation.isNotEmpty' })
  password: string;

  @IsArray({ message: 'validation.array' })
  @IsEnum(Role, { each: true, message: 'validation.isEnum' })
  @IsOptional()
  roles?: Role[];
}
