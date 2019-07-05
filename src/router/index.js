import Vue from 'vue';
import Router from 'vue-router';

import ADMIN_ROUTES from './admin';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('components/controllers/entryController')
    },
    {
      path: '/auth',
      component: () => import('components/auth/AuthLayout'),
      children: [
        {
          name: 'login',
          path: 'login',
          component: () => import('components/auth/login/Login')
        },
      ]
    },
  ].concat(ADMIN_ROUTES)
});
