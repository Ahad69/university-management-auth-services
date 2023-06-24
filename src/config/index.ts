import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database: process.env.DB_URI,
  default_password: process.env.DEFAULT_PASSWORD,
};
