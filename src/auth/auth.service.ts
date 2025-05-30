import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { LogInDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);
    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async logIn(LogInDto: LogInDto): Promise<{ access_token: string }> {
    const { email, password } = LogInDto;

    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new UnauthorizedException('invalid password');
    }

    const payload = { sub: user._id, email: user.email, name: user.name, lastName: user.lastName };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
