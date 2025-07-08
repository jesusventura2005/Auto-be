import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';

@Controller('maintenance')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Post()
  create(@Body() createMaintenanceDto: CreateMaintenanceDto) {
    return this.maintenanceService.create(createMaintenanceDto);
  }

  @Get()
  findAll() {
    return this.maintenanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maintenanceService.findOne(id);
  }

  @Get('car/:carId')
  findByCarId(@Param('carId') carId: string, @Query('completed') completed?: string, @Query('limit') limit?: string) {
    return this.maintenanceService.findByCarId(carId, {
      completed: completed !== undefined ? completed === 'true' : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    });
  }

  @Get('car/:carId/latest')
  findLatestByCarId(@Param('carId') carId: string) {
    return this.maintenanceService.findLatestByCarId(carId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaintenanceDto: UpdateMaintenanceDto) {
    return this.maintenanceService.update(id, updateMaintenanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maintenanceService.remove(id);
  }
}
