import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},

  routes: [
    {
      path: '/login',
      component: '@/pages/Login',
    },
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/table',
      component: '@/pages/Table',
    },
  ],
  proxy: {
    '/api': {
      target: 'http://39.106.9.148/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  npmClient: 'pnpm',
});
