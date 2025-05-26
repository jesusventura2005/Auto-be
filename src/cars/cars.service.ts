import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
// import { UpdateCarDto } from './dto/update-car.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Car } from './entities/car.entity';
import { Model } from 'mongoose';

@Injectable()
export class CarsService {
  constructor(@InjectModel(Car.name) private readonly carModel: Model<Car>) {}

  async create(createCarDto: CreateCarDto): Promise<Car> {
    try {
      const carExist = await this.carModel.findOne({ plate: createCarDto.plate }).exec();
      if (carExist) {
        throw new ConflictException(`Car already exist `);
      }
      const car = await this.carModel.create(createCarDto);
      return await car.save();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    try {
      const cars = await this.carModel.find().exec();

      if (!cars) {
        throw new NotFoundException('Not found cars');
      }
      return cars;
    } catch (error) {
      throw new BadRequestException(`Failed to fetch cars ${error}`);
    }
  }

  async findOne(plate: string) {
    try {
      const car = await this.carModel.findOne({ plate: plate });
      if (!car) {
        throw new NotFoundException(`Not found Car ${plate}`);
      }
      return car;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  // addMaintenance();

  // update(plate: string, updateCarDto: UpdateCarDto) {
  //   ;
  // }

  remove(plate: string) {
    return `This action removes a #${plate} car`;
  }
}
