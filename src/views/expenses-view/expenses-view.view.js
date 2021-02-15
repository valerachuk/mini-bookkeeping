import { DatabaseViewTable } from '@/components';
import {
  ExpensesRepository,
  NotificationsService,
  ISO8601DateFormatter,
  ExpensesReportService
} from '@/services';

export default {

  components: {
    DatabaseViewTable
  },

  data: () => ({
    fields: [],
    items: []
  }),

  methods: {
    createItem () {
      this.$router.push({ name: 'ExpensesCreate' });
    },
    deleteItem (id) {
      ExpensesRepository
        .delete(id)
        .then(() => {
          NotificationsService.fireSuccess(`Successfully deleted an expense with id: ${id}`);
          this.readItems();
        });
    },
    updateItem (id) {
      this.$router.push({ name: 'ExpensesUpdate', params: { editId: id } });
    },
    readItems () {
      ExpensesRepository
        .readPrettyView()
        .then(({ items, fields }) => {
          this.items = items.map(item => ({
            ...item,
            DateOfPurchase: ISO8601DateFormatter.formatDate(item.DateOfPurchase)
          }));
          this.fields = fields;
        });
    },
    downloadReport (id) {
      ExpensesReportService.requestShowingSaveDialog(id);
    }
  },

  mounted () {
    this.readItems();
  }

};
