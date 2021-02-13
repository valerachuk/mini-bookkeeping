import { DatabaseViewTable } from '@/components';
import { EmployeesRepository } from '@/services';

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
