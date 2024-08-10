import { Inject, Injectable } from '@nestjs/common';
import { ExtendedPrismaClient } from './prisma/extension/extended-prisma-client';
import { CustomPrismaService } from 'nestjs-prisma';
import { faker } from '@faker-js/faker';

@Injectable()
export class AppService {
  constructor(
    @Inject('PrismaService')
    private prisma: CustomPrismaService<ExtendedPrismaClient>,
  ) {}

  ///Prisma will select the correct database based on the operation read or write
  //By default, Prisma will use the primaryDB for write and the replicaDB for read
  //You can also specify the database to use by passing the database name in the context
  async read() {
    return this.prisma.client.user.findMany();
  }

  async write() {
    return this.prisma.client.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.internet.userName(),
      },
    });
  }

  async readPrimary() {
    return this.prisma.client.$primary().user.findMany();
  }
}
