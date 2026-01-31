import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { Application } from './entities/application.entity';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  async create(@Body() data: Partial<Application>): Promise<Application> {
    return this.applicationService.create(data);
  }

  @Get()
  async findAll(): Promise<Application[]> {
    return this.applicationService.findAll();
  }

  @Get('active')
  async findActive(): Promise<Application[]> {
    return this.applicationService.findActive();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Application> {
    return this.applicationService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Application>,
  ): Promise<Application> {
    return this.applicationService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.applicationService.remove(id);
  }
}
