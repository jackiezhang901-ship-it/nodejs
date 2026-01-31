import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  phone: string;
}
