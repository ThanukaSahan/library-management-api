import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class ActiveUserDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  userName: string;

  isActive: boolean = false;
}
