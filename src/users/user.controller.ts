import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { ActiveUserDto } from './dto/activeUser.dt';

@Controller('users')
export class UsersController {
  /**
   *
   */
  constructor(private usersService: UsersService) {}
  @Post('createUser')
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.usersService.createUser(createUserDto);
  }

  @Get('getAllUers')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('getByEmail/:email')
  async getUserByEmailId(@Param('email') email: string) {
    if (!email) throw new HttpException('Uesr Not Found', 404);
    const result = await this.usersService.getUserById(email);
    if (result.length == 0) {
      throw new HttpException('Uesr Not Found', 404);
    }
    return result;
  }

  @Patch('activeDeactivateUser')
  async activeUsers(@Body() activeUsers: ActiveUserDto) {
    return await this.usersService.activeDeactivateUser(activeUsers);
  }
}
