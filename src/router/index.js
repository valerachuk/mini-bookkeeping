import Vue from 'vue';
import VueRouter from 'vue-router';
import { EmployeesView, EmployeesCreateUpdateForm, DepartmentsView, DepartmentsCreateUpdateForm } from '@/views';

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
  }
];

const router = new VueRouter({
  routes
});

export default router;
