import { DatabaseService } from '@/services';
import { ResetDatabase, ResetDatabaseFill } from '@/sql';
const { query } = DatabaseService;

export default {
  resetDatabase () {
    return query(ResetDatabase);
  },
  resetDatabaseFill () {
    return query(ResetDatabaseFill);
  }
};
