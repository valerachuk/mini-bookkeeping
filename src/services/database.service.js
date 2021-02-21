import dbConnectionOptions from '@/configs/db.config';
import mysql2 from 'mysql2/promise';

const pool = mysql2.createPool(dbConnectionOptions);

export default {
  // pool,
  query (...args) {
    return pool.query(...args)
      .then(([items, fields]) => ({ items, fields: fields && fields.map(field => field && field.name) }));
  }
};
