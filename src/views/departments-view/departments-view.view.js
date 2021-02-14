import { DatabaseViewTable } from '@/components';
import { DepartmentsRepository } from '@/services';

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
      this.$router.push({ name: 'DepartmentsCreate' });
    },
    deleteItem (id) {
      DepartmentsRepository
        .delete(id)
        .then(() => {
          this.readItems();
        });
    },
    updateItem (id) {
      this.$router.push({ name: 'DepartmentsUpdate', params: { editId: id } });
    },
    readItems () {
      DepartmentsRepository
        .read()
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
