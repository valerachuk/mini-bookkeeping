import { DatabaseService } from '@/services';
const { query } = DatabaseService;

export default {
  create (formData) {
    return query('INSERT INTO departments ([Name]) VALUES (@Name);', formData);
  },
  read (id) {
    if (id === undefined) {
      return query('SELECT * FROM departments');
    }
    return query('SELECT * FROM departments WHERE Id=@id', { id })
      .then(({ items }) => items[0]);
  },
  update (formData) {
    return query('UPDATE departments SET [Name]=@Name WHERE Id=@Id', formData);
  },
  delete (id) {
    return query('DELETE FROM departments WHERE Id=@id', { id });
  }
};
