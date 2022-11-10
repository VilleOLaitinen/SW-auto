import * as dotenv from 'dotenv';
dotenv.config();

const Environment = {
  server: {
    port: 3000,
  },
  nettix: {
    // loaded from .env in the root of the project, NETTIX_USERNAME=username...
    email: process.env.NETTIX_USERNAME,
    password: process.env.NETTIX_PASSWORD,
  },
};

export default Environment;
