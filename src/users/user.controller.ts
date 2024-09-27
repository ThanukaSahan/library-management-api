import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Delete,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { ActiveUserDto } from './dto/activeUser.dto';
import mongoose, { mongo } from 'mongoose';
import { encryption } from 'src/common/encryption.service';

@Controller('users')
export class UsersController {
  /**
   *
   */
  constructor(
    private usersService: UsersService,
    private encryption: encryption,
  ) {}
  @Post('createUser')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const result = await this.usersService.getUserById(createUserDto.userName);
    console.log(result);
    if (result) {
      throw new HttpException('User already exists', 404);
    }
    console.log(createUserDto);
    const id = this.usersService.createUser(createUserDto);
    if (id) {
      return true;
    } else {
      return false;
    }
  }

  @Get('getAllUers')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('getByEmail/:email')
  async getUserByEmailId(@Param('email') email: string) {
    if (!email) throw new HttpException('Uesr Not Found', 404);
    const result = await this.usersService.getUserById(email);
    if (!result) {
      throw new HttpException('Uesr Not Found', 404);
    }
    return result;
  }

  @Patch('activeDeactivateUser')
  async activeUsers(@Body() activeUsers: ActiveUserDto) {
    return await this.usersService.activeDeactivateUser(activeUsers);
  }

  @Delete('deletUser')
  async deleteUser(@Query('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);
    const deleteUser = await this.usersService.deleteUser(id);
    if (!deleteUser) throw new HttpException('Invalid ID', 404);
    return true;
  }
}
