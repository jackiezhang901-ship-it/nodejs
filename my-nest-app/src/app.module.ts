import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationModule } from './config/configuration.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ApplicationModule } from './application/application.module';
import { PermissionModule } from './permission/permission.module';
import { CommonModule } from './common/common.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    ConfigurationModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    CommonModule,
    AuthModule,
    UserModule,
    ApplicationModule,
    PermissionModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
