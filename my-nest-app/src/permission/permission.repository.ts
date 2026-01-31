import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionRepository extends Repository<Permission> {
  constructor(private dataSource: DataSource) {
    super(Permission, dataSource.createEntityManager());
  }

  async findByCode(code: string): Promise<Permission | null> {
    return this.findOne({ where: { code } });
  }

  async findByApplicationId(applicationId: string): Promise<Permission[]> {
    return this.find({ where: { applicationId } });
  }

  async createPermission(data: Partial<Permission>): Promise<Permission> {
    const permission = this.create(data);
    return this.save(permission);
  }
}
