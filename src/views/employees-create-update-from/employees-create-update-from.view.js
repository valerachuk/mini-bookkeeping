import { NotEmptyStringValidationMixin, NotNullValidationMixin } from '@/mixins';
import { DepartmentsRepository, EmployeesRepository, NotificationsService } from '@/services';

export default {

  mixins: [
    NotEmptyStringValidationMixin,
    NotNullValidationMixin
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
      FullName: '',
      DepartmentId: null
    },
    departments: [],
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
        loadingPromise = EmployeesRepository
          .update(this.formData)
          .then(() => {
            NotificationsService.fireSuccess(`Successfully updated an employee with id: ${this.formData.Id}`);
          });
      } else {
        loadingPromise = EmployeesRepository
          .create(this.formData)
          .then(() => {
            NotificationsService.fireSuccess('Successfully created an employee');
          });
      }

      loadingPromise
        .then(() => {
          this.$router.push({ name: 'EmployeesView' });
        });
    }
  },

  mounted () {
    const formLoaders = [];

    if (this.isEditForm) {
      const editFormLoading = EmployeesRepository
        .read(this.editId)
        .then(result => {
          this.formData = result;
        });
      formLoaders.push(editFormLoading);
    }

    const departmentsLoading = DepartmentsRepository
      .read()
      .then(({ items }) => {
        this.departments = items.map(({ Id, Name }) => ({ text: `${Id}) ${Name}`, value: Id }));
      });
    formLoaders.push(departmentsLoading);

    Promise.all(formLoaders)
      .then(() => {
        this.formDisabled = false;
      });
  }

};
