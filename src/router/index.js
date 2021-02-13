import Vue from 'vue';
import VueRouter from 'vue-router';
import { EmployeesView, EmployeesCreateUpdateForm } from '@/views';

Vue.use(VueRouter);

const routes = [
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
  }
];

const router = new VueRouter({
  routes
});

export default router;
