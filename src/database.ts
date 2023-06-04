import { createPool } from 'mysql2/promise'

//Database configuration
export async function connect() {
    const connection = await createPool({
        host: 'localhost',
        user: 'root',
        database: 'user_management',
        connectionLimit: 100
    });
    return connection;
}