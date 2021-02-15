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
  readPrettyView (id) {
    if (id === undefined) {
      return pool.query('SELECT * FROM expenses_pretty_view')
        .then(([result, fields]) => ({ items: result, fields: fields.map(field => field.name) }));
    }
    return pool.query('SELECT * FROM expenses_pretty_view WHERE Id=?', [id])
      .then(([result]) => result[0]);
  },
  readThresholdCurrentSpendPerPeriod (typeOfCostId, year, month) {
    return pool.query(`
      select t.ThresholdPerMonth, coalesce(sum(e.Price), 0) as CurrentSpend
      from expenses as e
      right join types_of_costs as t
      on e.TypeOfCostId = t.Id and month(e.DateOfPurchase) = ? and year(e.DateOfPurchase) = ?
      where t.Id = ?
      group by t.Id;
    `, [month, year, typeOfCostId])
      .then(([result]) => result[0]); ;
  },
  readThresholdCurrentSpendPerPeriodWhthoutCurrentExpense (typeOfCostId, year, month, editingId) {
    return pool.query(`
      select t.ThresholdPerMonth, coalesce(sum(e.Price), 0) as CurrentSpend
      from expenses as e
      right join types_of_costs as t
      on e.TypeOfCostId = t.Id and month(e.DateOfPurchase) = ? and year(e.DateOfPurchase) = ? and e.Id != ?
      where t.Id = ?
      group by t.Id;
    `, [month, year, editingId, typeOfCostId])
      .then(([result]) => result[0]); ;
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
