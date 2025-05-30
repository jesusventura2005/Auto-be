import { IsString } from 'class-validator';

export class LogInResponseDto {
  @IsString()
  access_token: string;
}
