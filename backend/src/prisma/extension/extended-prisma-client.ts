import {PrismaClient} from '@prisma/client';
import {readReplicas} from '@prisma/extension-read-replicas';

export const extendedPrismaClient = (options?: any) => {
    const client = new PrismaClient(options)
        .$extends(readReplicas({
            url: process.env.DATABASE_SECONDARY_URL,
        }));

    return client;
};

export type ExtendedPrismaClient = ReturnType<typeof extendedPrismaClient>;