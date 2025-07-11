import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Maintenance } from './entities/maintenance.entity';
import { Car } from 'src/cars/entities/car.entity';

@Injectable()
export class MaintenanceService {
  constructor(
    @InjectModel('Maintenance') private maintenanceModel: Model<Maintenance>,
    @InjectModel('Car') private carModel: Model<Car>,
  ) {}

  async create(createMaintenanceDto: CreateMaintenanceDto): Promise<Maintenance> {
    try {
      const createdMaintenance = await this.maintenanceModel.create(createMaintenanceDto);

      await this.carModel
        .findByIdAndUpdate(
          createMaintenanceDto.carId,
          { $push: { maintenance: createdMaintenance._id } },
          { new: true },
        )
        .exec();
      return createdMaintenance;
    } catch (error) {
      throw new Error(`Error creating maintenance: ${error}`);
    }
  }

  async findAll(): Promise<Maintenance[]> {
    try {
      return await this.maintenanceModel.find().exec();
    } catch (error) {
      throw new Error(`Error fetching maintenances: ${error}`);
    }
  }

  async findOne(id: string): Promise<Maintenance> {
    try {
      const maintenance = await this.maintenanceModel.findById(id).exec();
      if (!maintenance) {
        throw new NotFoundException(`Maintenance with id ${id} not found`);
      }
      return maintenance;
    } catch (error) {
      throw new NotFoundException(`Error fetching maintenance with id ${id}: ${error}`);
    }
  }

  async findByCarId(carId: string, options?: { completed?: boolean; limit?: number }): Promise<Maintenance[]> {
    try {
      const query: { carId: string; completed?: boolean } = { carId };
      if (options?.completed !== undefined) {
        query.completed = options.completed; // true for completed, false for pending
      }

      let maintenanceQuery = this.maintenanceModel.find(query);

      if (options?.limit) {
        maintenanceQuery = maintenanceQuery.limit(options.limit);
      }
      const maintenances = await maintenanceQuery.exec();
      if (!maintenances || maintenances.length === 0) {
        return maintenances;
      }
      return maintenances;
    } catch (error) {
      throw new NotFoundException(`Error fetching maintenances for car with id ${carId}: ${error}`);
    }
  }

  async findLatestByCarId(carId: string): Promise<Maintenance[]> {
    try {
      const latestMaintenances = await this.maintenanceModel
        .aggregate([
          { $match: { carId: carId, completed: true } },
          { $sort: { date: -1 } },
          { $group: { _id: '$type', latest: { $first: '$$ROOT' } } },
          { $replaceRoot: { newRoot: '$latest' } },
        ])
        .exec();

      return latestMaintenances as Maintenance[];
    } catch (error) {
      throw new NotFoundException(`Error fetching latest maintenances for car with id ${carId}: ${error}`);
    }
  }

  async update(id: string, updateMaintenanceDto: UpdateMaintenanceDto) {
    try {
      const updatedMaintenance = await this.maintenanceModel
        .findByIdAndUpdate(id, updateMaintenanceDto, { new: true })
        .exec();
      if (!updatedMaintenance) {
        throw new NotFoundException(`Maintenance with id ${id} not found`);
      }
      return updatedMaintenance;
    } catch (error) {
      throw new NotFoundException(`Error updating maintenance with id ${id}: ${error}`);
    }
  }

  async remove(id: string) {
    try {
      const deletedMaintenance = await this.maintenanceModel.findByIdAndDelete(id).exec();
      if (!deletedMaintenance) {
        throw new NotFoundException(`Maintenance with id ${id} not found`);
      }
      return deletedMaintenance;
    } catch (error) {
      throw new NotFoundException(`Error deleting maintenance with id ${id}: ${error}`);
    }
  }
}
