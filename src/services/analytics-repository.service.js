import { DatabaseService } from '@/services';
const { query } = DatabaseService;

export default {
  totalSpentPerTypeOfCost () {
    return query(`
      select t.Id as TypeOfCostId, t.[Name] as TypeOfCostName, coalesce(sum(e.Price), 0) as TotalSpent
      from expenses as e
      right join types_of_costs as t
      on e.TypeOfCostId = t.Id
      group by t.Id, t.[Name]
      order by TotalSpent desc;
    `);
  },
  employeesCountPerDepartment () {
    return query(`
      select d.Id as DepartmentId, d.[Name] as DepartmentName, count(e.Id) as EmployeesCount
      from departments as d
      left join employees as e
      on d.Id = e.DepartmentId
      group by d.Id, d.[Name]
      order by EmployeesCount desc;
    `);
  },
  popularShopsByNumberOfExpenses () {
    return query(`
      select top 3 s.Id as ShopId, s.[Name] as ShopName, count(e.Id) as NumberOfExpenses
      from expenses as e
      right join shops as s
      on e.ShopId = s.Id
      group by s.Id, s.[Name]
      order by NumberOfExpenses desc;
    `);
  },
  spentTheLeastButMoreThanAverage () {
    return query(`
      declare @spentPerEmployee table (TotalSpent int);

      insert into @spentPerEmployee
      select sum(exp.Price) as TotalSpent
      from employees as emp
      join expenses as exp
      on exp.EmployeeId = emp.Id
      group by emp.Id;
      
      declare @avgSpent int;
      
      set @avgSpent = (select avg(TotalSpent) from @spentPerEmployee);
      
      select top 1 emp.Id as EmployeeId, emp.FullName, sum(exp.Price) as TotalSpent
      from employees as emp
      join expenses as exp
      on exp.EmployeeId = emp.Id
      group by emp.Id, emp.FullName
      having sum(exp.Price) > @avgSpent
      order by TotalSpent asc;    
    `);
  },
  currentSpendinMonth () {
    return query(`
      select t.Id as TypeOfCostId, t.[Name] as TypeOfCostName, t.ThresholdPerMonth, coalesce(sum(e.Price), 0) as CurrentSpent
      from expenses as e
      right join types_of_costs as t
      on e.TypeOfCostId = t.Id and month(e.DateOfPurchase) = month(getdate()) and year(e.DateOfPurchase) = year(getdate())
      group by t.Id, t.[Name], t.ThresholdPerMonth
      order by CurrentSpent desc;
    `);
  },
  foreignEmployees () {
    return query(`
      select emp.Id as EmployeeId, emp.FullName, sum(exp.Price) as TotalSpent
      from employees as emp
      join expenses as exp
      on exp.EmployeeId = emp.Id
      where exp.DepartmentId != emp.DepartmentId
      group by emp.Id, emp.FullName
      order by TotalSpent desc;
    `);
  }
};
