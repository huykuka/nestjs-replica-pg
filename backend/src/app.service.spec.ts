import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { prismaCustomMock } from './shared/mock';
import { createMock } from '@golevelup/ts-jest/lib/mocks';
import { ExtendedPrismaClient } from './prisma/extension/extended-prisma-client';
import { mockDeep } from 'jest-mock-extended';
import { CustomPrismaService } from 'nestjs-prisma';

describe('AppService', () => {
  let appsService: AppService;
  const prismaService = mockDeep<CustomPrismaService<ExtendedPrismaClient>>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: 'PrismaService',
          useValue: prismaCustomMock,
        },
      ],
    })
      .useMocker(createMock)
      .compile();
    appsService = module.get<AppService>(AppService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined"', () => {
    expect(appsService).toBeDefined();
  });
});
