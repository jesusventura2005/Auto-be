import { Module } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { MaintenanceController } from './maintenance.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MaintenanceSchema } from './entities/maintenance.entity';
import { Car, carSchema } from 'src/cars/entities/car.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Maintenance', schema: MaintenanceSchema },
      { name: Car.name, schema: carSchema },
    ]),
  ],
  controllers: [MaintenanceController],
  providers: [MaintenanceService],
})
export class MaintenanceModule {}
