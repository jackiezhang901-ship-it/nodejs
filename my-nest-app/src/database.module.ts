// database.module.ts
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'app',
      autoLoadEntities: true,
      synchronize: false,

      // ⭐ 连接池配置（底层 pg）
      extra: {
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
      },
    }),
  ],
})
export class DatabaseModule {}
