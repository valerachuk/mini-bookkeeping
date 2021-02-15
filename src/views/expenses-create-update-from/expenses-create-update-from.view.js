import { NotEmptyStringValidationMixin, NotNullValidationMixin, GreaterEqualsValidationMixin } from '@/mixins';
import {
  DepartmentsRepository,
  EmployeesRepository,
  ExpensesRepository,
  ShopsRepository,
  TypesOfCostsRepository,
  NotificationsService,
  ISO8601DateFormatter
} from '@/services';

export default {

  mixins: [
    NotEmptyStringValidationMixin,
    NotNullValidationMixin,
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
    dateMenu: false,

    showThresholdError: false,
    currentPeriodSpend: 0,
    thresholdPerMonth: 0,

    formData: {
      Description: '',
      DateOfPurchase: ISO8601DateFormatter.formatDate(new Date()),
      Price: '',
      DepartmentId: null,
      EmployeeId: null,
      TypeOfCostId: null,
      ShopId: null
    },

    departments: [],
    employees: [],
    typesOfCosts: [],
    shops: [],
    formDisabled: true
  }),

  computed: {
    isEditForm () {
      return !!this.editId;
    },
    isPeriodSpendError () {
      return this.thresholdPerMonth - this.currentPeriodSpend - this.formData.Price < 0;
    }
  },

  methods: {
    onSubmit () {
      this.$refs.form.validate();
      if (!this.isValid) {
        return;
      }

      const date = new Date(this.formData.DateOfPurchase);

      let validationLoading;

      if (this.isEditForm) {
        validationLoading = ExpensesRepository
          .readThresholdCurrentSpendPerPeriodWhthoutCurrentExpense(this.formData.TypeOfCostId, date.getFullYear(), date.getMonth() + 1, this.formData.Id);
      } else {
        validationLoading = ExpensesRepository
          .readThresholdCurrentSpendPerPeriod(this.formData.TypeOfCostId, date.getFullYear(), date.getMonth() + 1);
      }

      validationLoading
        .then(response => {
          this.thresholdPerMonth = response.ThresholdPerMonth;
          this.currentPeriodSpend = response.CurrentSpend;
          if (this.isPeriodSpendError) {
            this.showThresholdError = true;
          } else {
            this.sendForm();
          }
        });
    },
    sendForm () {
      this.formDisabled = true;
      let loadingPromise;
      if (this.isEditForm) {
        loadingPromise = ExpensesRepository
          .update(this.formData)
          .then(() => {
            NotificationsService.fireSuccess(`Successfully updated an expense with id: ${this.formData.Id}`);
          });
      } else {
        loadingPromise = ExpensesRepository
          .create(this.formData)
          .then(() => {
            NotificationsService.fireSuccess('Successfully created an expense');
          });
      }

      loadingPromise
        .then(() => {
          this.$router.push({ name: 'ExpensesView' });
        });
    }
  },

  mounted () {
    const formLoaders = [];

    if (this.isEditForm) {
      const editFormLoading = ExpensesRepository
        .read(this.editId)
        .then(result => {
          this.formData = {
            ...result,
            Price: result.Price.toString(),
            DateOfPurchase: ISO8601DateFormatter.formatDate(result.DateOfPurchase)
          };
        });
      formLoaders.push(editFormLoading);
    }

    const departmentsLoading = DepartmentsRepository
      .read()
      .then(({ items }) => {
        this.departments = items.map(({ Id, Name }) => ({ text: `${Id}) ${Name}`, value: Id }));
      });
    formLoaders.push(departmentsLoading);

    const employeesLoading = EmployeesRepository
      .readIdFullName()
      .then(({ items }) => {
        this.employees = items.map(({ Id, FullName }) => ({ text: `${Id}) ${FullName}`, value: Id }));
      });
    formLoaders.push(employeesLoading);

    const typesOfCostsLoading = TypesOfCostsRepository
      .readIdName()
      .then(({ items }) => {
        this.typesOfCosts = items.map(({ Id, Name }) => ({ text: `${Id}) ${Name}`, value: Id }));
      });
    formLoaders.push(typesOfCostsLoading);

    const shopsLoading = ShopsRepository
      .read()
      .then(({ items }) => {
        this.shops = items.map(({ Id, Name }) => ({ text: `${Id}) ${Name}`, value: Id }));
      });
    formLoaders.push(shopsLoading);

    Promise.all(formLoaders)
      .then(() => {
        this.formDisabled = false;
      });
  }

};
