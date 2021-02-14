import Vue from 'vue';
import VueRouter from 'vue-router';
import {
  EmployeesView,
  EmployeesCreateUpdateForm,
  DepartmentsView,
  DepartmentsCreateUpdateForm,
  ShopsView,
  ShopsCreateUpdateForm,
  TypesOfCostsView,
  TypesOfCostsCreateUpdateForm
} from '@/views';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: {
      name: 'EmployeesView'
    }
  },
  {
    path: '/employees-view',
    name: 'EmployeesView',
    component: EmployeesView,
    meta: {
      title: 'Employees'
    }
  },
  {
    path: '/employees-create',
    name: 'EmployeesCreate',
    component: EmployeesCreateUpdateForm,
    meta: {
      title: 'Add new employee'
    }
  },
  {
    path: '/employees-update/:editId',
    name: 'EmployeesUpdate',
    component: EmployeesCreateUpdateForm,
    props: true,
    meta: {
      title: 'Edit employee'
    }
  },
  {
    path: '/departments-view',
    name: 'DepartmentsView',
    component: DepartmentsView,
    meta: {
      title: 'Departments'
    }
  },
  {
    path: '/departments-create',
    name: 'DepartmentsCreate',
    component: DepartmentsCreateUpdateForm,
    meta: {
      title: 'Add new department'
    }
  },
  {
    path: '/departments-update/:editId',
    name: 'DepartmentsUpdate',
    component: DepartmentsCreateUpdateForm,
    props: true,
    meta: {
      title: 'Edit department'
    }
  },
  {
    path: '/shops-view',
    name: 'ShopsView',
    component: ShopsView,
    meta: {
      title: 'Shops'
    }
  },
  {
    path: '/shops-create',
    name: 'ShopsCreate',
    component: ShopsCreateUpdateForm,
    meta: {
      title: 'Add new shop'
    }
  },
  {
    path: '/shops-update/:editId',
    name: 'ShopsUpdate',
    component: ShopsCreateUpdateForm,
    props: true,
    meta: {
      title: 'Edit shop'
    }
  },
  {
    path: '/types-of-costs-view',
    name: 'TypesOfCostsView',
    component: TypesOfCostsView,
    meta: {
      title: 'Types of costs'
    }
  },
  {
    path: '/types-of-costs-create',
    name: 'TypesOfCostsCreate',
    component: TypesOfCostsCreateUpdateForm,
    meta: {
      title: 'Add new type of cost'
    }
  },
  {
    path: '/types-of-costs-update/:editId',
    name: 'TypesOfCostsUpdate',
    component: TypesOfCostsCreateUpdateForm,
    props: true,
    meta: {
      title: 'Edit type of cost'
    }
  }
];

const router = new VueRouter({
  routes
});

export default router;
