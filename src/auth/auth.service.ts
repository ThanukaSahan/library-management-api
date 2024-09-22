import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginUser } from './dto/loginUser.dto';
import { encryption } from 'src/common/encryption.service';
import { JwtService } from '@nestjs/jwt';
import { promises } from 'dns';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private encryption: encryption,
    private jwtService: JwtService,
  ) {}

  async signIn(loguser: LoginUser): Promise<{ access_token: string }> {
    console.log('Start login:', loguser.userId);
    const user = await this.usersService.getUserById(loguser.userId);
    if (!user) throw new HttpException('Uesr Not Found', 404);
    const iv = Buffer.from(user.key, 'hex');
    const encryptedPassword = await this.encryption.encrypt(
      loguser.password,
      iv,
    );
    if (user.password === encryptedPassword) {
      const payload = { sub: user.id, username: user.userName };
      console.log(payload);
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}
