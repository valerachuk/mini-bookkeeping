import { DatabaseService } from '@/services';
const { pool } = DatabaseService;

export default {
  totalSpentPerTypeOfCost () {
    return pool.query(`
      select t.Id as TypeOfCostId, t.\`Name\` as TypeOfCostName, coalesce(sum(e.Price), 0) as TotalSpent
      from expenses as e
      right join types_of_costs as t
      on e.TypeOfCostId = t.Id
      group by t.Id
      order by TotalSpent desc;
    `)
      .then(([result, fields]) => ({ items: result, fields: fields.map(field => field.name) }));
  },
  employeesCountPerDepartment () {
    return pool.query(`
      select d.Id as DepartmentId, d.\`Name\` as DepartmentName, count(e.Id) as EmployeesCount
      from departments as d
      left join employees as e
      on d.Id = e.DepartmentId
      group by d.Id
      order by EmployeesCount desc;
    `)
      .then(([result, fields]) => ({ items: result, fields: fields.map(field => field.name) }));
  },
  popularShopsByNumberOfExpenses () {
    return pool.query(`
      select s.Id as ShopId, s.\`Name\` as ShopName, count(e.Id) as NumberOfExpenses
      from expenses as e
      right join shops as s
      on e.ShopId = s.Id
      group by s.Id
      order by NumberOfExpenses desc
      limit 3;
    `)
      .then(([result, fields]) => ({ items: result, fields: fields.map(field => field.name) }));
  },
  spentTheLeastButMoreThanAverage () {
    return pool.query(`
      select emp.Id as EmployeeId, emp.FullName, sum(exp.Price) as TotalSpent, T2.AvgPrice
      from employees as emp
      join expenses as exp
      on exp.EmployeeId = emp.Id
      join 
      (select avg(T1.TotalSpent) as AvgPrice
        from 
          (select emp.Id as EmployeeId, sum(exp.Price) as TotalSpent
        from employees as emp
        join expenses as exp
        on exp.EmployeeId = emp.Id
          group by emp.Id
          ) T1
      ) T2
      group by emp.Id
      having TotalSpent > T2.AvgPrice
      order by TotalSpent asc
      limit 1;
    `)
      .then(([result, fields]) => ({ items: result, fields: fields.map(field => field.name) }));
  },
  currentSpendinMonth () {
    return pool.query(`
      select t.Id as TypeOfCostId, t.\`Name\` as TypeOfCostName, t.ThresholdPerMonth, coalesce(sum(e.Price), 0) as CurrentSpent
      from expenses as e
      right join types_of_costs as t
      on e.TypeOfCostId = t.Id and month(e.DateOfPurchase) = month(curdate()) and year(e.DateOfPurchase) = year(curdate())
      group by t.Id
      order by CurrentSpent desc;
    `)
      .then(([result, fields]) => ({ items: result, fields: fields.map(field => field.name) }));
  },
  foreignEmployees () {
    return pool.query(`
      select emp.Id as EmployeeId, emp.FullName, sum(exp.Price) as TotalSpent
      from employees as emp
      join expenses as exp
      on exp.EmployeeId = emp.Id
      where exp.DepartmentId != emp.DepartmentId
      group by emp.Id
      order by TotalSpent desc;
    `)
      .then(([result, fields]) => ({ items: result, fields: fields.map(field => field.name) }));
  }
};
