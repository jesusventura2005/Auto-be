import { Injectable } from '@nestjs/common';
import { User } from './users.interface';

@Injectable()
export class UsersService {
  private readonly users = [];

  create(user: User): User {
    this.users.push(user);
    return user;
  }
}
