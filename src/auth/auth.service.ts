import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user || bcrypt.compareSync(password, user.password) === false) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, name: user.name, lastName: user.lastName };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
