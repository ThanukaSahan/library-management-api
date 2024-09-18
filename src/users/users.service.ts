import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/createUser.dto';
import { ActiveUserDto } from './dto/activeUser.dt';

@Injectable()
export class UsersService {
  /**
   *
   */
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  createUser(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  getAllUsers() {
    return this.userModel.find();
  }

  getUserById(userId: string) {
    return this.userModel.where('userName').equals(userId).exec();
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
