import { NotEmptyStringvalidationMixin } from '@/mixins';

export default {

  mixins: [
    NotEmptyStringvalidationMixin
  ],

  props: {
    showId: Boolean
  },

  methods: {
    onClick () {
      this.$refs.form.validate();
      if (this.isValid) {
        this.$emit('submit', this.formData);
      }
    }
  },

  data: () => ({
    isValid: false,
    formData: {
      fullName: ''
    }
  })

};
