import {
  IsEmail,
  isEmpty,
  IsEmpty,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty()
  Name: string;

  @IsEmail()
  Email: string;

  Website: string;

  Biography: string;

  Nationality: string;

  CreateUser: string;
}
