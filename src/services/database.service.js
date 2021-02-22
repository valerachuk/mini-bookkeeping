import dbConnectionOptions from '@/configs/db.config';
import mssql from 'mssql/msnodesqlv8';

const pool = new mssql.ConnectionPool(dbConnectionOptions);
const poolConnection = pool.connect();

export default {
  query (sqlQuery, params = {}) {
    return poolConnection.then((pool) => {
      const request = new mssql.Request(pool);
      Object.entries(params).forEach(([key, value]) => {
        request.input(key, value);
      });
      return request
        .query(sqlQuery)
        .then((response) => ({
          items: response.recordset,
          fields: response.recordset && Object.keys(response.recordset.columns)
        }));
    });
  },
  closeAllConnections () {
    pool.close();
  }
};
