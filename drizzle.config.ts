import type { Config } from 'drizzle-kit';

export default {
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || (() => {
      throw new Error('DATABASE_URL environment variable is required');
    })(),
  },
} satisfies Config; 