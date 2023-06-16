import * as joi from 'joi';
import { Module } from '@nestjs/common';
import { DatabaseModule, LoggerModule } from '@app/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    DatabaseModule,
    LoggerModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        JWT_SECRET: joi.string().required(),
        JWT_EXP: joi.string().required(),
        MONGODB_URI: joi.string().required(),
      }),
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          global: true,
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: `${config.get('JWT_EXP')}s`,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
