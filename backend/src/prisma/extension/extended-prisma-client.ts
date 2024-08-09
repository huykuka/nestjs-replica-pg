import { PrismaClient } from '@prisma/client';
import { readReplicas } from '@prisma/extension-read-replicas'

export const extendedPrismaClient = (options?: any) =>
  new PrismaClient(options)
    .$extends( readReplicas({
        url: process.env.DATABASE_SECONDARY_URL,
    }))


export type ExtendedPrismaClient = ReturnType<typeof extendedPrismaClient>;
