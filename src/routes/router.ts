
import { createRouter, createWebHistory } from 'vue-router'
import { VulnerabilityView, VulnerabilityFixedView, LoginView, VulnerabilitySummaryView, RegisterView } from '@views'
import { Layout } from '@components';

import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'vulnerabilities',
        name: 'vulnerabilities',
        component: VulnerabilityView
      }, {
        path: 'vulnerabilities-fixed',
        name: 'vulnerabilities-fixed',
        component: VulnerabilityFixedView
      },
      {
        path: 'vulnerabilities-summary',
        name: 'vulnerabilities-summary',
        component: VulnerabilitySummaryView
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView

];
export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token')

  if (to.path !== '/login' && to.path !== '/register' && !isAuthenticated) {
    next('/login') 
  } else {
    next()
  }
})

