import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/createUser.dto';
import { ActiveUserDto } from './dto/activeUser.dto';
import { randomBytes } from 'crypto';
import { encryption } from 'src/common/encryption.service';

@Injectable()
export class UsersService {
  /**
   *
   */
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private encryption: encryption,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const iv = randomBytes(16);
    createUserDto.key = iv.toString('hex');
    createUserDto.password = await this.encryption.encrypt(
      createUserDto.password,
      iv,
    );
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  getAllUsers() {
    return this.userModel.find();
  }

  async getUserById(userId: string) {
    const user = await this.userModel.findOne({ userName: userId }).exec();
    if (!user) {
      return null;
    }
    return user;
  }

  async activeDeactivateUser(activeUser: ActiveUserDto) {
    return await this.userModel.findOneAndUpdate(
      { userName: activeUser.userName },
      { $set: { isActive: activeUser.isActive } },
      { new: true },
    );
  }

  async deleteUser(userId: string) {
    return await this.userModel.findByIdAndDelete(userId);
  }
}
