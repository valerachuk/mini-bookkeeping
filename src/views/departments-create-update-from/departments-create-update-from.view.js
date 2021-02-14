import { NotEmptyStringValidationMixin } from '@/mixins';
import { DepartmentsRepository, NotificationsService } from '@/services';

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
        loadingPromise = DepartmentsRepository
          .update(this.formData)
          .then(() => {
            NotificationsService.fireSuccess(`Successfully updated a department with id: ${this.formData.Id}`);
          });
      } else {
        loadingPromise = DepartmentsRepository
          .create(this.formData)
          .then(() => {
            NotificationsService.fireSuccess('Successfully created a department');
          });
      }

      loadingPromise
        .then(() => {
          this.$router.push({ name: 'DepartmentsView' });
        });
    }
  },

  mounted () {
    if (this.isEditForm) {
      DepartmentsRepository
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
