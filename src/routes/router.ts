
import { createRouter, createWebHistory } from 'vue-router'
import { VulnerabilityView, VulnerabilityFixedView } from '@views'
import { Layout } from '@components';

const routes = [
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
        name: 'vulnerabilities-fixed' ,
        component: VulnerabilityFixedView
      }
    ]
  }
];
export const router = createRouter({
  history: createWebHistory(),
  routes,
});
