import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

//algunos end-points deberian ser con el id, ademas debemos proteger los endpoint para que cualquier persona
// no pueda estar editandolos solo el dueño del carro
@ApiTags('cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new car' })
  @ApiResponse({
    status: 200,
    description: 'The car has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 409, description: 'Car already exists.' })
  create(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }

  @Get(':owner')
  findById(@Param('owner') owner: string) {
    return this.carsService.findById(owner);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cars' })
  @ApiResponse({ status: 200, description: 'Return all cars.' })
  findAll() {
    return this.carsService.findAll();
  }

  @Get(':id/showIt')
  @ApiOperation({ summary: 'Get a car by id' })
  @ApiResponse({ status: 200, description: 'Return the car.' })
  @ApiResponse({ status: 404, description: 'Car not found.' })
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(id);
  }

  @Patch(':plate')
  @ApiOperation({ summary: 'Update a car by plate' })
  @ApiResponse({
    status: 200,
    description: 'The car has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Car not found.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  update(@Param('plate') plate: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(plate, updateCarDto);
  }

  @Delete(':plate')
  @ApiOperation({ summary: 'Delete a car by plate' })
  @ApiResponse({
    status: 200,
    description: 'The car has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Car not found.' })
  remove(@Param('plate') plate: string) {
    return this.carsService.remove(plate);
  }
}
