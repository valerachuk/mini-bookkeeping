import { DatabaseService } from '@/services';
const { query } = DatabaseService;

export default {
  create (formData) {
    return query('INSERT INTO types_of_costs (`Name`, `Description`, ThresholdPerMonth) VALUES (?, ?, ?);', [formData.Name, formData.Description, formData.ThresholdPerMonth]);
  },
  read (id) {
    if (id === undefined) {
      return query('SELECT * FROM types_of_costs');
    }
    return query('SELECT * FROM types_of_costs WHERE Id=?', [id])
      .then(({ items }) => items[0]);
  },
  readIdName () {
    return query('SELECT Id, Name FROM types_of_costs');
  },
  update (formData) {
    return query('UPDATE types_of_costs SET `Name`=?, `Description`=?, ThresholdPerMonth=? WHERE Id=?', [formData.Name, formData.Description, formData.ThresholdPerMonth, formData.Id]);
  },
  delete (id) {
    return query('DELETE FROM types_of_costs WHERE Id=?', [id]);
  }
};
