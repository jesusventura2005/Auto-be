import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiOperation({
    summary: 'Create a new User',
  })
  @Post()
  create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @ApiOperation({
    summary: 'GEt all Users',
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({
    summary: 'Get user by id',
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Updated an user by id',
  })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({
    summary: 'Delete an user by id',
  })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(+id);
  }
}
