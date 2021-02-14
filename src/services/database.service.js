import dbConnectionOptions from '@/configs/db.config';
import mysql2 from 'mysql2/promise';

export default {
  pool: mysql2.createPool(dbConnectionOptions)
};
