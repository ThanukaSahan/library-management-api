import {
  IsEmail,
  isEmpty,
  IsEmpty,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class UpdateAuthorDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  Name: string;

  @IsEmail()
  Email: string;

  Website: string;

  Biography: string;

  Nationality: string;

  UpdateDate: Date;

  UpdaterUser: string;

  Image: string;
}
