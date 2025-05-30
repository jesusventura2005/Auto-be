import { Controller, Post, Body, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LogInDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() loginUserDto: LogInDto) {
    return this.authService.logIn(loginUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() registerDto: CreateUserDto) {
    try {
      return await this.authService.register(registerDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
