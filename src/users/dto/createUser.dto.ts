import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  lasttName?: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  mobileNo: number;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  isActive: boolean = false;

  key: string;
}
