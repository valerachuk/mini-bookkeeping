import { DatabaseService } from '@/services';
const { query } = DatabaseService;

export default {
  create (formData) {
    return query('INSERT INTO departments (`Name`) VALUES (?);', [formData.Name]);
  },
  read (id) {
    if (id === undefined) {
      return query('SELECT * FROM departments');
    }
    return query('SELECT * FROM departments WHERE Id=?', [id])
      .then(({ items }) => items[0]);
  },
  update (formData) {
    return query('UPDATE departments SET `Name`=? WHERE Id=?', [formData.Name, formData.Id]);
  },
  delete (id) {
    return query('DELETE FROM departments WHERE Id=?', [id]);
  }
};
