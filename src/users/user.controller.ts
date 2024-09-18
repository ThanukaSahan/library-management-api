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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { ActiveUserDto } from './dto/activeUser.dto';
import mongoose, { mongo } from 'mongoose';
import { LoginUser } from './dto/loginUser.dto';
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
    if (result) {
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

  @Post('login')
  async userLogin(@Body() loguser: LoginUser) {
    console.log('Start login');
    const user = await this.usersService.getUserById(loguser.userId);
    if (!user) throw new HttpException('Uesr Not Found', 404);
    const iv = Buffer.from(user.key, 'hex');
    console.log(iv);
    console.log(user.password);
    const encryptedPassword = await this.encryption.encrypt(
      loguser.password,
      iv,
    );
    console.log(encryptedPassword);
    if (user.password === encryptedPassword) {
      return true;
    } else {
      return false;
    }
  }
}
