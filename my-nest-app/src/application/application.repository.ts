import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Application } from './entities/application.entity';

@Injectable()
export class ApplicationRepository extends Repository<Application> {
  constructor(private dataSource: DataSource) {
    super(Application, dataSource.createEntityManager());
  }

  async findByName(name: string): Promise<Application | null> {
    return this.findOne({ where: { name } });
  }

  async findActiveApplications(): Promise<Application[]> {
    return this.find({ where: { isActive: true } });
  }

  async createApplication(data: Partial<Application>): Promise<Application> {
    const application = this.create(data);
    return this.save(application);
  }
}
