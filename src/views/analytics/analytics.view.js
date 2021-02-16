import { AnalyticsRepository, NotificationsService } from '@/services';

export default {

  data: () => ({
    analyticsQueries: [
      {
        title: 'Total spent per type of cost',
        description: 'Returns total spent per type of cost, ordered by total spent descending. Output columns: TypeOfCostId, TypeOfCostName, TotalSpent.',
        queryMethod: AnalyticsRepository.totalSpentPerTypeOfCost
      },
      {
        title: 'Employees count per department',
        description: 'Returns employees count per department, ordered by employees count descending. Output columns: DepartmentId, DepartmentName, EmployeesCount.',
        queryMethod: AnalyticsRepository.employeesCountPerDepartment
      },
      {
        title: 'Top 3 popular shops, by number of expenses',
        description: 'Returns popular shops (by number of expenses) ordered by number of expenses descending, limited by 3. Output columns: ShopId, ShopName, NumberOfExpenses.',
        queryMethod: AnalyticsRepository.popularShopsByNumberOfExpenses
      },
      {
        title: 'Employee spent the least but more than average',
        description: 'Find the employee who spent the least but more than average.\nOutput columns: EmployeeId, FullName, TotalSpent, AvgPrice.',
        queryMethod: AnalyticsRepository.spentTheLeastButMoreThanAverage
      },
      {
        title: 'Total spend per type of cost in current month',
        description: 'Returns total spend per type of cost in current month, ordered by total spent descending. Output columns: TypeOfCostId, TypeOfCostName, ThresholdPerMonth, CurrentSpent.',
        queryMethod: AnalyticsRepository.currentSpendinMonth
      },
      {
        title: 'Employees that have ever made a spend for another department',
        description: 'Find the employees that have ever made a spend for another department, ordering by their total spend descending. Output columns: EmployeeId, FullName, TotalSpent.',
        queryMethod: AnalyticsRepository.foreignEmployees
      }
    ],
    tableItems: [],
    tableFields: []
  }),

  methods: {
    onQuery (analyticsQuery) {
      analyticsQuery
        .queryMethod()
        .then(({ items, fields }) => {
          this.tableItems = items;
          this.tableFields = fields.map(field => ({
            text: field,
            value: field
          }));
          NotificationsService.fireSuccess('Query just executed successfully');
        });
    }
  }

};
