import Vue from 'vue';
import VueRouter from 'vue-router';
import { EmployeesView, EmployeesCreate } from '@/views';

Vue.use(VueRouter);

const routes = [
  {
    path: '/employees-view',
    // path: '/',
    name: 'EmployeesView',
    component: EmployeesView,
    meta: {
      title: 'Employees'
    }
  },
  {
    // path: '/employees-create',
    path: '/',
    name: 'EmployeesCreate',
    component: EmployeesCreate,
    meta: {
      title: 'Add new employee'
    }
  }
];

const router = new VueRouter({
  routes
});

export default router;
