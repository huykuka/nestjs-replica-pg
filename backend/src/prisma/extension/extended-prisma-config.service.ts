import { Injectable } from '@nestjs/common';
import { CustomPrismaClientFactory } from 'nestjs-prisma';
import {
  type ExtendedPrismaClient,
  extendedPrismaClient,
} from './extended-prisma-client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ExtendedPrismaConfigService
  implements CustomPrismaClientFactory<ExtendedPrismaClient>
{
  constructor(readonly configService: ConfigService) {
    // TODO inject any other service here like the `ConfigService`
  }

  createPrismaClient(): ExtendedPrismaClient {
    const options = {
      datasources: {
        db: {
          url: this.configService.get('DATABASE_URL'),
        },
      },
    };

    // you could pass options to your `PrismaClient` instance here
    return extendedPrismaClient(options);
  }
}
