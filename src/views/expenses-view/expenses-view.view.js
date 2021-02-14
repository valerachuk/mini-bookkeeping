import { DatabaseViewTable } from '@/components';
import { ExpensesRepository, NotificationsService, ISO8601DateFormatter } from '@/services';

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
            DateOFPurchase: ISO8601DateFormatter.formatDate(item.DateOFPurchase)
          }));
          this.fields = fields;
        });
    }
  },

  mounted () {
    this.readItems();
  }

};
