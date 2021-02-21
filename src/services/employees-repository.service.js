import { DatabaseService } from '@/services';
const { query } = DatabaseService;

export default {
  create (formData) {
    return query('INSERT INTO employees(FullName, DepartmentId) VALUES (?, ?);', [formData.FullName, formData.DepartmentId]);
  },
  read (id) {
    if (id === undefined) {
      return query('SELECT * FROM employees');
    }
    return query('SELECT * FROM employees WHERE Id=?', [id])
      .then(({ items }) => items[0]);
  },
  readPrettyView () {
    return query('SELECT * FROM employees_pretty_view');
  },
  readIdFullName () {
    return query('SELECT Id, FullName FROM employees');
  },
  update (formData) {
    return query('UPDATE employees SET FullName=?, DepartmentId=? WHERE Id=?;', [formData.FullName, formData.DepartmentId, formData.Id]);
  },
  delete (id) {
    return query('DELETE FROM employees WHERE Id=?', [id]);
  }
};
