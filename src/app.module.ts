import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { database_config, DatabaseConfig } from '@configs/configuration.config'
import { AuthModule } from '@modules/auth/auth.module'
import User from '@entities/user.entity'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV?.trim() === 'development' ? '.env.dev' : '.env',
      load: [database_config],
      cache: true,
      expandVariables: true
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const databaseEnv = configService.get<DatabaseConfig>('database')
        return {
          type: 'postgres',
          host: databaseEnv.host,
          port: databaseEnv.port,
          username: databaseEnv.username,
          password: databaseEnv.password,
          database: databaseEnv.database,
          entities: [User],
          synchronize: true
        }
      }
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
