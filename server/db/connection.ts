import { createConnection } from "typeorm";
import { User } from '../models/User';

// createConnection method will automatically read connection options
// from your ormconfig file and environment variables
createConnection().then(() => {
  console.log('Database connected');
});
