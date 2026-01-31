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
import { PermissionService } from './permission.service';
import { Permission } from './entities/permission.entity';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  async create(@Body() data: Partial<Permission>): Promise<Permission> {
    return this.permissionService.create(data);
  }

  @Get()
  async findAll(): Promise<Permission[]> {
    return this.permissionService.findAll();
  }

  @Get('application/:applicationId')
  async findByApplicationId(
    @Param('applicationId') applicationId: string,
  ): Promise<Permission[]> {
    return this.permissionService.findByApplicationId(applicationId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Permission> {
    return this.permissionService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Permission>,
  ): Promise<Permission> {
    return this.permissionService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.permissionService.remove(id);
  }
}
