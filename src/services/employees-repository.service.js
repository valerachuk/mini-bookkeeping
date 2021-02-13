import { DatabaseService } from '@/services';
const { pool } = DatabaseService;

export default {
  create (formData) {
    return pool.query('INSERT INTO employees(FullName, DepartmentId) VALUES (?, ?);', [formData.FullName, formData.DepartmentId]);
  },
  read (id) {
    if (id === undefined) {
      return pool.query('SELECT * FROM employees')
        .then(([result, fields]) => ({ items: result, fields: fields.map(field => field.name) }));
    }
    return pool.query('SELECT * FROM employees WHERE Id=?', [id])
      .then(([result]) => result[0]);
  },
  readPrettyView () {
    return pool.query('SELECT * FROM employees_pretty_view')
      .then(([result, fields]) => ({ items: result, fields: fields.map(field => field.name) }));
  },
  update (formData) {
    return pool.query('UPDATE employees SET FullName=?, DepartmentId=? WHERE Id=?;', [formData.FullName, formData.DepartmentId, formData.Id]);
  },
  delete (id) {
    return pool.query('DELETE FROM employees WHERE Id=?', [id]);
  }
};
