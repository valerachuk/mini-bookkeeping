import { DatabaseService } from '@/services';
import { ResetDatabase, ResetDatabaseFill } from '@/sql';
const { pool } = DatabaseService;

export default {
  resetDatabase () {
    return pool.query(ResetDatabase);
  },
  resetDatabaseFill () {
    return pool.query(ResetDatabaseFill);
  }
};
