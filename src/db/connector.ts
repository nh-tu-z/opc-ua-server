import mongoose from 'mongoose';
import { dbOptions } from '../config/db-config';
import { green, red } from '../utils/log';

export async function connect(uri: String = 'mongodb://127.0.0.1', port: Number = 27017, database: String = 'test'): Promise<void> {
  var connectionString = `${uri}:${port}/${database}`;
  try {
    await mongoose.connect(connectionString, dbOptions, 
    (err) => {
      if (err) throw err;
      green(`connect successfully`, `[mongoDB]`);
    });
  }
  catch (err) {
    red(`connection fail - ${err}`, `[mongoDB]`);
  }
}

