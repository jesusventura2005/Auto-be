import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Request() req): Promise<LoginResponseDTO | BadRequestException> {
    return this.authService.logIn(req.user);
  }

  @Post('register')
  async register(@Body() signInDTO: SignInDTO): Promise<LoginResponseDTO | BadRequestException> {}
}
