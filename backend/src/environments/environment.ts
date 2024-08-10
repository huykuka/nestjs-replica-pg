import { config } from 'dotenv';
import { expand } from 'dotenv-expand';

export const environment = () => ({
  ...expand(config({ path: `src/environments/.env.${process.env.NODE_ENV || 'dev'}` })),
});
