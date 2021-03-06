import { DatabaseService } from '@/services';
const { query } = DatabaseService;

export default {
  create (formData) {
    return query('INSERT INTO shops (`Name`) VALUES (?);', [formData.Name]);
  },
  read (id) {
    if (id === undefined) {
      return query('SELECT * FROM shops');
    }
    return query('SELECT * FROM shops WHERE Id=?', [id])
      .then(({ items }) => items[0]);
  },
  update (formData) {
    return query('UPDATE shops SET `Name`=? WHERE Id=?', [formData.Name, formData.Id]);
  },
  delete (id) {
    return query('DELETE FROM shops WHERE Id=?', [id]);
  }
};
