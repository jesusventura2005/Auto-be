import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCarDto {
  @ApiProperty({
    description: 'The type of the car',
    example: 'Sedan',
  })
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    description: 'The brand of the car',
    example: 'Toyota',
  })
  @IsNotEmpty()
  brand: string;

  @ApiProperty({
    description: 'The model of the car',
    example: 'Corolla',
  })
  @IsNotEmpty()
  model: string;

  @ApiProperty({
    description: 'The age of the car in years',
    example: 2020,
  })
  @IsNotEmpty()
  age: number;

  @ApiProperty({
    description: 'The owner of the car',
    example: '310482dsanu212',
  })
  @IsNotEmpty()
  ownerId: string;

  @ApiProperty({
    description: 'The license plate of the car',
    example: 'ABC123',
  })
  @IsNotEmpty()
  plate: string;
}
