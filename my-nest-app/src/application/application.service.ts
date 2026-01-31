import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ApplicationRepository } from './application.repository';
import { Application } from './entities/application.entity';

@Injectable()
export class ApplicationService {
  constructor(private readonly applicationRepository: ApplicationRepository) {}

  async create(data: Partial<Application>): Promise<Application> {
    if (!data.name) {
      throw new BadRequestException('Application name is required');
    }

    const existingApp = await this.applicationRepository.findByName(data.name);
    if (existingApp) {
      throw new BadRequestException('Application name already exists');
    }

    return this.applicationRepository.createApplication(data);
  }

  async findAll(): Promise<Application[]> {
    return this.applicationRepository.find();
  }

  async findOne(id: string): Promise<Application> {
    const application = await this.applicationRepository.findOne({
      where: { id },
    });
    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }
    return application;
  }

  async findActive(): Promise<Application[]> {
    return this.applicationRepository.findActiveApplications();
  }

  async update(id: string, data: Partial<Application>): Promise<Application> {
    const application = await this.findOne(id);
    Object.assign(application, data);
    return this.applicationRepository.save(application);
  }

  async remove(id: string): Promise<void> {
    const application = await this.findOne(id);
    await this.applicationRepository.remove(application);
  }
}
