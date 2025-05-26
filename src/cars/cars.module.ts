import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { carSchema, Car } from './entities/car.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Car.name, schema: carSchema }])],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
