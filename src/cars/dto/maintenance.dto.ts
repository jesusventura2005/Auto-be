import { IsNotEmpty, IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MaintenanceDto {
  @ApiProperty({
    description: 'The type of maintenance',
    example: 'Oil Change',
  })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({
    description: 'Description of the maintenance',
    example: 'Regular oil change and filter replacement',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Date of the maintenance',
    example: '2024-03-20T10:00:00Z',
  })
  @IsNotEmpty()
  @IsDate()
  date: Date;
}
