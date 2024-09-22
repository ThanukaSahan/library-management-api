import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUser {
  @IsEmail()
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  password: string;
}
