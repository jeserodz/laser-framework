import * as path from 'path';
import * as fs from 'fs';

// Check that .env file exists
const envPath = path.resolve(__dirname, '../../.env');

if (fs.existsSync(envPath)) {
  console.log('.env file found');
} else {
  throw new Error('.env file not found!');
}
