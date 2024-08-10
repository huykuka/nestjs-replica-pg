import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomPrismaModule } from 'nestjs-prisma';
import {ExtendedPrismaConfigService} from "./prisma/extension";
import {ConfigModule} from "@nestjs/config";
import {environment} from "./environments/environment";
@Module({
  imports: [
    CustomPrismaModule.forRootAsync({
      name: 'PrismaService',
      useClass: ExtendedPrismaConfigService,
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [environment],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
