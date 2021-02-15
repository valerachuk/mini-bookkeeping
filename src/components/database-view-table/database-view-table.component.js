import { VDataTable } from 'vuetify/lib/components/VDataTable';

export default {

  components: {
    VDataTable
  },

  props: {
    items: {
      type: Array,
      required: true
    },
    fields: {
      type: Array,
      required: true
    },
    showDownloadIcon: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    headers () {
      const headers = this.fields.map(x => ({ text: x, value: x }));
      headers.push({
        text: 'Actions',
        value: 'actions',
        sortable: false
      });
      return headers;
    }
  },

  data: () => ({
    pendingToDelete: null,
    deleteDialog: false
  })

};
