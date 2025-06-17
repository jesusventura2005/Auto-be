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
  carModel: string;

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
  owner: string;

  @ApiProperty({
    description: 'The license plate of the car',
    example: 'ABC123',
  })
  @IsNotEmpty()
  plate: string;

  @ApiProperty({
    description: 'Unique serial car',
    example: '1231dsad123d4',
  })
  @IsNotEmpty()
  serial: string;
}
