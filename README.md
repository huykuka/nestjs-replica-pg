## Postgres - Read Replicas with Nestjs-Prisma

### Description

This project demonstrates how to set up a NestJS application with Prisma to use PostgreSQL read replicas. The primary
focus is on configuring Prisma extensions to handle read replicas effectively. The project includes Docker setup for
easy deployment and testing.

### Prerequisites

- Node.js (v18 or later)
- npm (v6 or later)
- Docker
- dotenv-cli is globally installed
    ```bash
    npm i -g dotenv-cli
    ```

## Docker Setup

In the main directory, run the following command to start the Docker containers:
This docker-compose file spins up 2 PostgreSQL databases, one for the primary database and the other for the read.
replica. The primary database is accessible at `localhost:5432` and the read replica is accessible at `localhost:5433`
replica.

1. Start the containers
    ```bash
    docker-compose up -d
    ```

## Prisma Initialization

1. To initialize Prisma, run the following command:

    ```bash
    npx prisma generate
    ```

   This command generates the Prisma client based on the schema defined in `prisma/schema.prisma`.
2. To create the database schema, run the following command:

    ```bash
    npm run prisma:migrate
    ```

   This command creates the database schema based on the migration files in the `prisma/migrations` directory.

## Prisma Extension Setup

This project uses the `nestjs-prisma` package to handle Prisma client configuration. The `ExtendedPrismaConfigService`.

To use read replicas with Prisma, you need to create a custom Prisma client factory that configures the Prisma client to
use the read replica database URL.

### Configuration

1. Create a `backend/src/prisma/extension/extended-prisma-client.ts` file: <br>
   This file extends the Prisma client with read replicas.

 ```typescript
 import {PrismaClient} from '@prisma/client';
import {readReplicas} from '@prisma/extension-read-replicas';

export const extendedPrismaClient = (options?: any) => {
    return new PrismaClient(options).$extends(
        readReplicas({
            url: process.env.DATABASE_SECONDARY_URL,
        }),
    );
};

export type ExtendedPrismaClient = ReturnType<typeof extendedPrismaClient>;
 ```

2. Create a `backend/src/prisma/extension/extended-prisma-config.service.ts` file: <br>
   This file create a Prisma client to connect to the primary databse
    ```typescript
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
      constructor(readonly configService: ConfigService) {}

      createPrismaClient(): ExtendedPrismaClient {
        const options = {
          datasources: {
            db: {
              url: this.configService.get('DATABASE_URL'),
            },
          },
        };

        return extendedPrismaClient(options);
      }
    }
    ```

### Running the App

    ```bash
    npm run start
    ```

### Testing

```bash
npm run test
```
