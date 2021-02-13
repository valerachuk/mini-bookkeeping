import { DatabaseService } from '@/services';
const { pool } = DatabaseService;

export default {
  create (formData) {
    return pool.query('INSERT INTO shops (`Name`) VALUES (?);', [formData.Name]);
  },
  read (id) {
    if (id === undefined) {
      return pool.query('SELECT * FROM shops')
        .then(([result, fields]) => ({ items: result, fields: fields.map(field => field.name) }));
    }
    return pool.query('SELECT * FROM shops WHERE Id=?', [id])
      .then(([result]) => result[0]);
  },
  update (formData) {
    return pool.query('UPDATE shops SET `Name`=? WHERE Id=?', [formData.Name, formData.Id]);
  },
  delete (id) {
    return pool.query('DELETE FROM shops WHERE Id=?', [id]);
  }
};
