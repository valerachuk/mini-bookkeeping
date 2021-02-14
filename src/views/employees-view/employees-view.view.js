import { DatabaseViewTable } from '@/components';
import { EmployeesRepository, NotificationsService } from '@/services';

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
      this.$router.push({ name: 'EmployeesCreate' });
    },
    deleteItem (id) {
      EmployeesRepository
        .delete(id)
        .then(() => {
          NotificationsService.fireSuccess(`Successfully deleted an employee with id: ${id}`);
          this.readItems();
        });
    },
    updateItem (id) {
      this.$router.push({ name: 'EmployeesUpdate', params: { editId: id } });
    },
    readItems () {
      EmployeesRepository
        .readPrettyView()
        .then(({ items, fields }) => {
          this.items = items;
          this.fields = fields;
        });
    }
  },

  mounted () {
    this.readItems();
  }

};
