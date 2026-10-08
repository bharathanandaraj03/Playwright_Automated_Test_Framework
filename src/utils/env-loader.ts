import * as dotenv from 'dotenv';
import path from 'path';

// Determine the environment, default to 'qa' if not specified
const environment = process.env.ENV || 'qa';

// Load the corresponding .env file from the config folder
const envPath = path.resolve(__dirname, `../../config/.env.${environment}`);
dotenv.config({ path: envPath });

export class EnvConfig {
  static get BASE_URL(): string {
    return process.env.BASE_URL || 'https://www.saucedemo.com/';
  }

  static get TIMEOUT(): number {
    return process.env.TIMEOUT ? parseInt(process.env.TIMEOUT, 10) : 30000;
  }

  static get IS_HEADLESS(): boolean {
    return process.env.HEADLESS === 'true';
  }
}