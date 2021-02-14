import { NotEmptyStringValidationMixin } from '@/mixins';
import { ShopsRepository, NotificationsService } from '@/services';

export default {

  mixins: [
    NotEmptyStringValidationMixin
  ],

  props: {
    showId: Boolean,
    editId: {
      type: [String, Number],
      required: false
    }
  },

  data: () => ({
    isValid: false,
    formData: {
      Name: ''
    },
    formDisabled: true
  }),

  computed: {
    isEditForm () {
      return !!this.editId;
    }
  },

  methods: {
    onSubmit () {
      this.$refs.form.validate();
      if (!this.isValid) {
        return;
      }

      this.formDisabled = true;
      let loadingPromise;
      if (this.isEditForm) {
        loadingPromise = ShopsRepository
          .update(this.formData)
          .then(() => {
            NotificationsService.fireSuccess(`Successfully updated a shop with id: ${this.formData.Id}`);
          });
      } else {
        loadingPromise = ShopsRepository
          .create(this.formData)
          .then(() => {
            NotificationsService.fireSuccess('Successfully created a shop');
          });
      }

      loadingPromise
        .then(() => {
          this.$router.push({ name: 'ShopsView' });
        });
    }
  },

  mounted () {
    if (this.isEditForm) {
      ShopsRepository
        .read(this.editId)
        .then(result => {
          this.formData = result;
          this.formDisabled = false;
        });
    } else {
      this.formDisabled = false;
    }
  }

};
