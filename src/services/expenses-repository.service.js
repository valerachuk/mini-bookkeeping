import { DatabaseService } from '@/services';
const { query } = DatabaseService;

export default {
  create (formData) {
    return query(
      `INSERT INTO expenses(Description, Price, DateOfPurchase, DepartmentId, EmployeeId, TypeOfCostId, ShopId) 
      VALUES (@Description, @Price, @DateOfPurchase, @DepartmentId, @EmployeeId, @TypeOfCostId, @ShopId);`,
      formData
    );
  },
  read (id) {
    if (id === undefined) {
      return query('SELECT * FROM expenses');
    }
    return query('SELECT * FROM expenses WHERE Id=@id', { id })
      .then(({ items }) => items[0]);
  },
  readPrettyView (id) {
    if (id === undefined) {
      return query('SELECT * FROM expenses_pretty_view');
    }
    return query('SELECT * FROM expenses_pretty_view WHERE Id=@id', { id })
      .then(({ items }) => items[0]);
  },
  readThresholdCurrentSpendPerPeriod (typeOfCostId, year, month) {
    return query(`
      select t.ThresholdPerMonth, coalesce(sum(e.Price), 0) as CurrentSpend
      from expenses as e
      right join types_of_costs as t
      on e.TypeOfCostId = t.Id and month(e.DateOfPurchase) = @month and year(e.DateOfPurchase) = @year
      where t.Id = @typeOfCostId
      group by t.Id, t.ThresholdPerMonth;
    `, { month, year, typeOfCostId })
      .then(({ items }) => items[0]);
  },
  readThresholdCurrentSpendPerPeriodWhthoutCurrentExpense (typeOfCostId, year, month, editingId) {
    return query(`
      select t.ThresholdPerMonth, coalesce(sum(e.Price), 0) as CurrentSpend
      from expenses as e
      right join types_of_costs as t
      on e.TypeOfCostId = t.Id and month(e.DateOfPurchase) = @month and year(e.DateOfPurchase) = @year and e.Id != @editingId
      where t.Id = @typeOfCostId
      group by t.Id, t.ThresholdPerMonth;
    `, { month, year, editingId, typeOfCostId })
      .then(({ items }) => items[0]);
  },
  update (formData) {
    return query(
      `UPDATE expenses SET Description=@Description, Price=@Price, DateOfPurchase=@DateOfPurchase, 
      DepartmentId=@DepartmentId, EmployeeId=@EmployeeId, TypeOfCostId=@TypeOfCostId, ShopId=@ShopId WHERE Id=@Id;`,
      formData
    );
  },
  delete (id) {
    return query('DELETE FROM expenses WHERE Id=@id', { id });
  }
};
