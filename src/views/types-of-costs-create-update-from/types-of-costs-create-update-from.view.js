import { NotEmptyStringValidationMixin, GreaterEqualsValidationMixin } from '@/mixins';
import { TypesOfCostsRepository, NotificationsService } from '@/services';

export default {

  mixins: [
    NotEmptyStringValidationMixin,
    GreaterEqualsValidationMixin
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
      Name: '',
      Description: '',
      ThresholdPerMonth: ''
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
        loadingPromise = TypesOfCostsRepository
          .update(this.formData)
          .then(() => {
            NotificationsService.fireSuccess(`Successfully updated a type of cost with id: ${this.formData.Id}`);
          });
      } else {
        loadingPromise = TypesOfCostsRepository
          .create(this.formData)
          .then(() => {
            NotificationsService.fireSuccess('Successfully created a type of cost');
          });
      }

      loadingPromise
        .then(() => {
          this.$router.push({ name: 'TypesOfCostsView' });
        });
    }
  },

  mounted () {
    if (this.isEditForm) {
      TypesOfCostsRepository
        .read(this.editId)
        .then(result => {
          this.formData = result;
          this.formData.ThresholdPerMonth = this.formData.ThresholdPerMonth.toString();
          this.formDisabled = false;
        });
    } else {
      this.formDisabled = false;
    }
  }

};
