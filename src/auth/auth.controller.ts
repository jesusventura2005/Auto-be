import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInResponseDto } from './dto/login-response.dto';
import { LogInDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() LogInDto: LogInDto): Promise<LogInResponseDto | BadRequestException> {
    return this.authService.logIn(LogInDto);
  }
}
