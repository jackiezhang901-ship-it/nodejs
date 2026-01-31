import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Application } from './application/entities/application.entity';
import { Permission } from './permission/entities/permission.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'my_nest_app',
  entities: [User, Application, Permission],
  migrations: ['dist/migrations/*.js'],
  subscribers: [],
  synchronize: false,
  logging: process.env.DB_LOGGING === 'true',
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});
