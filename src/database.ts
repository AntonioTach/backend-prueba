import { createPool, Pool } from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const host = process.env.DB_HOST;
const user = process.env.DB_USERNAME;
const pass = process.env.DB_PASSWORD;
const dbName = process.env.DB_DBNAME;

// Database configuration
export async function connect(): Promise<Pool> {
  const connection = await createPool({
    host: host,
    user: user,
    password: pass,
    database: dbName,
    ssl: {
      rejectUnauthorized: false,
    }
  });
  return connection;
}
