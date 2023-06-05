import { createPool } from 'mysql2/promise'
import dotenv from 'dotenv';
dotenv.config();

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

//Database configuration
export async function connect() {
    const connection = await createPool({
      host: dbHost,
      user: dbUser,
      password: dbPassword,
      database: dbName,
      connectionLimit: 100
    });
    return connection;
  }