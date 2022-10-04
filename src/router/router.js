import Vue from 'vue'
import Router from 'vue-router'

import vCatalog from '../components/catalog/v-catalog'
import vProductStatistics from '../components/catalog/v-product-statistics'
import vMainPage from '../components/main-page/v-main-page'
import vProductPage from '../components/catalog/v-product-page'
import vProductPageNew from '../components/catalog/v-product-page-new'

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'mainPage',
      component: vMainPage
    },
    {
      path: '/products',
      name: 'products',
      component: vCatalog
    },
    {
      path: '/product/new',
      name: 'productNew',
      component: vProductPageNew
    },
    {
      path: '/product/:id',
      name: 'product',
      component: vProductPage
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: vProductStatistics,
    },
  ]
})

export default router;
