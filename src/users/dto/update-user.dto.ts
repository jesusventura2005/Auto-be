import { PartialType } from '@nestjs/mapped-types';
import { UsersCreateDTO } from './create-user.dto';

export class UpdateUserDto extends PartialType(UsersCreateDTO) {}
