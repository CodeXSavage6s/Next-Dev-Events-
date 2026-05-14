import { Pool } from 'pg';

const poolConfig = {
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 20000,
  ssl: {
    rejectUnauthorized: false // Required for some hosted environments
  }
};

const globalForDb = global as unknown as { pool: Pool };

export const pool = globalForDb.pool || new Pool(poolConfig);

if (process.env.NODE_ENV !== 'production') {
  globalForDb.pool = pool;
}

export const query = (text: string, params?: any[]) => pool.query(text, params);
