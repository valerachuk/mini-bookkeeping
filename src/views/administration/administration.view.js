import { DatabaseAdministration, NotificationsService } from '@/services';

export default {

  data: () => ({
    actionToExecute: null,
    confirmDialog: false
  }),

  methods: {
    resetDatabase () {
      DatabaseAdministration
        .resetDatabase()
        .then(() => NotificationsService.fireSuccess('Successfully reseted database'));
    },
    resetDatabaseAndFillWithTestData () {
      DatabaseAdministration
        .resetDatabaseFill()
        .then(() => NotificationsService.fireSuccess('Successfully reseted database and filled it with test data'));
    }
  }

};
