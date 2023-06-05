import { App } from './app';
import * as dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT;

async function main() {
    const app = new App(PORT);
    await app.listen();
}

main(); 
