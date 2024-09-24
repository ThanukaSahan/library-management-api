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
import { Roles } from './roles.decorator';
import { Role } from 'src/enum/role.enum';
import { RolesGuard } from './roles.guard';
@Controller('auth')
@UseGuards(RolesGuard)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async userLogin(@Body() loguser: LoginUser) {
    return await this.authService.signIn(loguser);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @Roles(Role.Admin)
  getProfile(@Request() req) {
    return req.user;
  }
}
