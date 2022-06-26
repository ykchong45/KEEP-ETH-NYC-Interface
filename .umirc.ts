import { defineConfig } from 'umi';

export default defineConfig({
  // dynamicImport: {},
  nodeModulesTransform: {
    type: 'none',
  },

  theme: {
    'primary-color': '#ffc000',
    'table-header-bg': '#0e1118',
    'table-header-color': '#ffffff',
    'table-selected-row-bg': '#0e1118',
    'table-header-sort-bg': '#0e1118',
    'table-body-sort-bg': '#0e1118',
    'table-row-hover-bg': '#1b1d23',
    'table-border-color': 'rgba(0,0,0,0)',
    'tabs-card-head-background': '#1b1d23',
    'tabs-card-gutter': '0',
    'tabs-card-tab-active-border-top': '2px solid #ffc000',
    'text-color': '#ffffff',
    'body-background': '#0e1118',
    'component-background': '#0e1118',
    'layout-body-background': '#0e1118',
    'layout-header-background': '#0e1118',
    'menu-item-active-bg': 'rgba(0,0,0,0)',
  },
  routes: [
    {
      path: '/',
      component: '../layouts/BasicLayout',
      routes: [
        {
          path: '/',
          title: 'Keep Finance',
          component: '@/pages/Landing',
        },
        {
          path: '/market',
          title: 'Keep Finance',
          component: '@/pages/Market',
        },
        {
          path: '/margin',
          title: 'Keep Finance',
          component: '@/pages/Margin',
        },
      ],
    },
  ],
  fastRefresh: {},
});
