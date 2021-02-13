import { DatabaseService } from '@/services';
const { pool } = DatabaseService;

export default {
  create (formData) {
    return pool.query('INSERT INTO types_of_costs (`Name`, `Description`, ThresholdPerMonth) VALUES (?, ?, ?);', [formData.Name, formData.Description, formData.ThresholdPerMonth]);
  },
  read (id) {
    if (id === undefined) {
      return pool.query('SELECT * FROM types_of_costs')
        .then(([result, fields]) => ({ items: result, fields: fields.map(field => field.name) }));
    }
    return pool.query('SELECT * FROM types_of_costs WHERE Id=?', [id])
      .then(([result]) => result[0]);
  },
  update (formData) {
    return pool.query('UPDATE types_of_costs SET `Name`=?, `Description`=?, ThresholdPerMonth=? WHERE Id=?', [formData.Name, formData.Description, formData.ThresholdPerMonth, formData.Id]);
  },
  delete (id) {
    return pool.query('DELETE FROM types_of_costs WHERE Id=?', [id]);
  }
};
