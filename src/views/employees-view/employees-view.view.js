import { DatabaseViewTable } from '@/components';
import { mapState } from 'vuex';

export default {

  components: {
    DatabaseViewTable
  },

  computed: {
    ...mapState('employees', ['items', 'fields'])
  },

  mounted () {
    this.$store.dispatch('employees/load');
  },

  methods: {
    createItem () {
      console.log('new');
    },
    deleteItem (id) {
      console.log('delete', id);
    },
    updateItem (id) {
      console.log('edit', id);
    }
  }

};
