import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { CustomPrismaService } from 'nestjs-prisma';
import type { ExtendedPrismaClient } from '../../prisma/extension/extended-prisma-client';

export const prismaCustomMock = <
  DeepMockProxy<CustomPrismaService<ExtendedPrismaClient>>
>{
  client: mockDeep<ExtendedPrismaClient>(),
};
