import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Car } from './entities/car.entity';
import { Model } from 'mongoose';
import { MaintenanceDto } from './dto/maintenance.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CarsService {
  constructor(
    @InjectModel(Car.name) private readonly carModel: Model<Car>,
    private usersService: UsersService,
  ) {}

  async create(createCarDto: CreateCarDto): Promise<Car> {
    const carExist = await this.carModel.findOne({ plate: createCarDto.plate }).exec();
    const serialExist = await this.carModel.findOne({ serial: createCarDto.serial }).exec();
    if (carExist) {
      throw new ConflictException(`Car already exist `);
    }
    if (serialExist) {
      throw new ConflictException(`Serial already exist `);
    }

    try {
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

  async findById(id: string) {
    try {
      const user = await this.usersService.findOne(id);
      if (!user) {
        throw new NotFoundException('not found user');
      }
      const cars = await this.carModel
        .find({ owner: id })
        .populate({
          path: 'maintenance',
          match: { completed: true },
          options: { sort: { date: -1 }, limit: 1 },
        })
        .exec();
      if (!cars) {
        throw new NotFoundException('Not found cars');
      }
      return cars;
    } catch (error) {
      throw new BadRequestException(`Failed to fetch cars ${error}`);
    }
  }

  async findOne(id: string) {
    try {
      const car = await this.carModel.findById(id).exec();
      if (!car) {
        throw new NotFoundException(`Not found Car ${id}`);
      }
      return car;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(plate: string, updateCarDto: UpdateCarDto) {
    try {
      const updatedCar = await this.carModel
        .findOneAndUpdate({ plate }, { $set: updateCarDto }, { new: true, runValidators: true })
        .exec();

      if (!updatedCar) {
        throw new NotFoundException(`Car with plate ${plate} not found`);
      }

      return updatedCar;
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(`Error updating car: ${error.message}`);
      }
      throw new BadRequestException('Error updating car');
    }
  }

  async remove(plate: string) {
    try {
      const car = await this.carModel.deleteOne({ plate: plate });
      if (!car) {
        throw new NotFoundException(`Not found car ${plate}`);
      }
      return car;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async addMaintenance(plate: string, maintenance: MaintenanceDto) {
    try {
      const car = await this.carModel.findOne({ plate });
      if (!car) {
        throw new NotFoundException(`Car with plate ${plate} not found`);
      }

      car.maintenance.push(maintenance);
      return await car.save();
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(`Error adding maintenance: ${error.message}`);
      }
      throw new BadRequestException('Error adding maintenance');
    }
  }
}
