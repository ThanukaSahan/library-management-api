import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LoginUser } from './dto/loginUser.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async userLogin(@Body() loguser: LoginUser) {
    return await this.authService.signIn(loguser);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
