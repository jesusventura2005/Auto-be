import { IsString } from 'class-validator';

export class SignInDTO {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
