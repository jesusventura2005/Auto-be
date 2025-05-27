import { Injectable } from '@nestjs/common';
import { UsersCreateDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/users.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: UsersCreateDTO): Promise<User> {
    try {
      const encryptedPassword = await bcrypt.hash(createUserDto.password, 10);
      const createdUser = new this.userModel({
        ...createUserDto,
        password: encryptedPassword,
      });
      return await createdUser.save();
    } catch (error) {
      throw new Error(`Error creating user: ${error}`);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      throw new Error(`Error fetching users: ${error}`);
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new Error(`User with id ${id} not found`);
      }
      return user;
    } catch (error) {
      throw new Error(`Error fetching user with id ${id}: ${error}`);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.userModel
        .findByIdAndUpdate(id, updateUserDto, { new: true, runValidators: true })
        .exec();
      if (!updatedUser) {
        throw new Error(`User with id ${id} not found`);
      }
      return updatedUser;
    } catch (error) {
      throw new Error(`Error updating user with id ${id}: ${error}`);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
