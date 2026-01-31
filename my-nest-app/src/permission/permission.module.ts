import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { PermissionService } from './permission.service';
import { PermissionRepository } from './permission.repository';
import { ApplicationModule } from '../application/application.module';

@Module({
  imports: [TypeOrmModule.forFeature([Permission]), ApplicationModule],
  providers: [PermissionService, PermissionRepository],
  exports: [PermissionService, PermissionRepository],
})
export class PermissionModule {}
