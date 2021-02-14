import { DatabaseService } from '@/services';
const { pool } = DatabaseService;

export default {
  create (formData) {
    return pool.query(
      'INSERT INTO expenses(Description, Price, DateOfPurchase, DepartmentId, EmployeeId, TypeOfCostId, ShopId) VALUES (?, ?, ?, ?, ?, ?, ?);',
      [formData.Description, formData.Price, formData.DateOfPurchase, formData.DepartmentId, formData.EmployeeId, formData.TypeOfCostId, formData.ShopId]
    );
  },
  read (id) {
    if (id === undefined) {
      return pool.query('SELECT * FROM expenses')
        .then(([result, fields]) => ({ items: result, fields: fields.map(field => field.name) }));
    }
    return pool.query('SELECT * FROM expenses WHERE Id=?', [id])
      .then(([result]) => result[0]);
  },
  readPrettyView () {
    return pool.query('SELECT * FROM expenses_pretty_view')
      .then(([result, fields]) => ({ items: result, fields: fields.map(field => field.name) }));
  },
  update (formData) {
    return pool.query(
      'UPDATE expenses SET Description=?, Price=?, DateOfPurchase=?, DepartmentId=?, EmployeeId=?, TypeOfCostId=?, ShopId=? WHERE Id=?;',
      [formData.Description, formData.Price, formData.DateOfPurchase, formData.DepartmentId, formData.EmployeeId, formData.TypeOfCostId, formData.ShopId, formData.Id]
    );
  },
  delete (id) {
    return pool.query('DELETE FROM expenses WHERE Id=?', [id]);
  }
};
