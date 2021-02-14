import { DatabaseViewTable } from '@/components';
import { TypesOfCostsRepository, NotificationsService } from '@/services';

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
      this.$router.push({ name: 'TypesOfCostsCreate' });
    },
    deleteItem (id) {
      TypesOfCostsRepository
        .delete(id)
        .then(() => {
          NotificationsService.fireSuccess(`Successfully deleted a type of cost with id: ${id}`);
          this.readItems();
        });
    },
    updateItem (id) {
      this.$router.push({ name: 'TypesOfCostsUpdate', params: { editId: id } });
    },
    readItems () {
      TypesOfCostsRepository
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
