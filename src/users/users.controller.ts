import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersCreateDTO } from './dto/UsersCreateDTO';

@Controller('users')
export class UsersController {
  @Get()
  findAll(): string {
    return 'This action returns all users';
  }

  @Post()
  create(@Body() usersCreateDTO: UsersCreateDTO) {
    return 'This action adds a new user';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns user #${id}`;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    return `This action updates user #${id}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes user #${id}`;
  }
}
