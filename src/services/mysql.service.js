import dbConnectionOptions from '@/configs/db.config';
const mysql2 = require('mysql2/promise');

export const pool = mysql2.createPool(dbConnectionOptions);
