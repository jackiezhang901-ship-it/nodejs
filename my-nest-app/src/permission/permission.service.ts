import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PermissionRepository } from './permission.repository';
import { ApplicationRepository } from '../application/application.repository';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    private readonly permissionRepository: PermissionRepository,
    private readonly applicationRepository: ApplicationRepository,
  ) {}

  async create(data: Partial<Permission>): Promise<Permission> {
    // 验证应用是否存在
    const application = await this.applicationRepository.findOne({
      where: { id: data.applicationId },
    });
    if (!application) {
      throw new BadRequestException('Application not found');
    }

    // 检查权限代码是否重复
    if (!data.code) {
      throw new BadRequestException('Permission code is required');
    }

    const existingPermission = await this.permissionRepository.findByCode(data.code);
    if (existingPermission) {
      throw new BadRequestException('Permission code already exists');
    }

    return this.permissionRepository.createPermission(data);
  }

  async findAll(): Promise<Permission[]> {
    return this.permissionRepository.find();
  }

  async findOne(id: string): Promise<Permission> {
    const permission = await this.permissionRepository.findOne({
      where: { id },
    });
    if (!permission) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }
    return permission;
  }

  async findByApplicationId(applicationId: string): Promise<Permission[]> {
    return this.permissionRepository.findByApplicationId(applicationId);
  }

  async update(id: string, data: Partial<Permission>): Promise<Permission> {
    const permission = await this.findOne(id);
    Object.assign(permission, data);
    return this.permissionRepository.save(permission);
  }

  async remove(id: string): Promise<void> {
    const permission = await this.findOne(id);
    await this.permissionRepository.remove(permission);
  }
}
