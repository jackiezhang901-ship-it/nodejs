import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @IsOptional()
  firstName?: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @IsOptional()
  lastName?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
