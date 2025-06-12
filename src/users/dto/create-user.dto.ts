import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Name of the user',
    example: 'Antonio',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'lastName of the user',
    example: 'Goodman',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'email of the user',
    example: 'AntonioGoodman@gmail.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'password of the user',
    example: 'Antonio12345',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'userType of the user',
    example: 'admin',
  })
  @IsString()
  userType: string;
}
