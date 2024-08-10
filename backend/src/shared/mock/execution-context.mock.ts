import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext } from '@nestjs/common';

export const executionContextMock: ExecutionContext = createMock<ExecutionContext>();
