import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateMaintenanceDto {
  @ApiProperty({
    description: 'The ID of the car associated with the maintenance record',
    example: '60c72b2f9b1e8d3f4c8b4567',
  })
  @IsNotEmpty()
  @IsMongoId()
  carId: string;

  @ApiProperty({
    description: 'The title of the maintenance record',
    example: 'Oil Change',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'A detailed description of the maintenance work done',
    example: 'Changed the engine oil and replaced the oil filter.',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The type of maintenance performed',
    example: 'Routine',
  })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({
    description: 'The date when the maintenance was performed',
    example: '2023-10-01T10:00:00Z',
  })
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @ApiProperty({
    description: 'The number of kilometers driven at the time of maintenance',
    example: 15000,
  })
  @IsNotEmpty()
  kilometers: number;

  @ApiProperty({
    description: 'Indicates whether the maintenance is completed',
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  completed: boolean;
}
