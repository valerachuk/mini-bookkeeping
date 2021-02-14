import { DatabaseViewTable } from '@/components';
import { ShopsRepository, NotificationsService } from '@/services';

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
      this.$router.push({ name: 'ShopsCreate' });
    },
    deleteItem (id) {
      ShopsRepository
        .delete(id)
        .then(() => {
          NotificationsService.fireSuccess(`Successfully deleted a shop with id: ${id}`);
          this.readItems();
        });
    },
    updateItem (id) {
      this.$router.push({ name: 'ShopsUpdate', params: { editId: id } });
    },
    readItems () {
      ShopsRepository
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
