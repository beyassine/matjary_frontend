import store from '../store';
import { createRouter, createWebHistory } from 'vue-router'


import SignupView from '../views/SignupView.vue'
import LoginView from '../views/LoginView.vue'
import NotFound from '../views/404.vue'
import HomeView from '../views/HomeView.vue'


// Store
import StoreDetail from '../views/store/StoreDetailView.vue'
import ProductDetail from '../views/store/ProductDetailView.vue'

//Admin

///Product
import AdminProductView from '../views/admin/AdminProductView.vue'
import AdminProductAddView from '../views/admin/AdminProductAddView.vue'
import AdminProductEditView from '../views/admin/AdminProductEditView.vue'
///Order
import AdminOrderView from '../views/admin/AdminOrderView.vue'
///Settings
import AdminStoreSettingsView from '../views/admin/AdminStoreSettingsView.vue'
import AdminStoreShippingView from '../views/admin/AdminStoreShippingView.vue'


const routes = [
  {
    path: '',
    name: 'home',
    meta: { extend: true, white: true },
    component: HomeView
  },
  {
    path: '/signup',
    name: 'signup',
    meta: { extend: true, white: true },
    component: SignupView
  },
  {
    path: '/login',
    name: 'login',
    meta: { extend: true, white: true },
    component: LoginView
  },
  {
    path: '/404/:pathMatch(.*)*',
    name: '404',
    meta: { extend: false },
    component: NotFound
  },

  //Store
  {
    path: '/:storeId',
    name: 'storedetail',
    meta: { extend: true, requiresAuth: false },
    component: StoreDetail
  },
  {
    path: '/product/:productId',
    name: 'productdetail',
    meta: { extend: true, requiresAuth: false },
    component: ProductDetail
  },

  // Admin   

  /// Products
  {
    path: '/admin/products',
    name: 'adminproducts',
    meta: { extend: false, requiresAuth: true },
    component: AdminProductView
  },
  {
    path: '/admin/products/new',
    name: 'adminaddproducts',
    meta: { extend: false, requiresAuth: true },
    component: AdminProductAddView
  },
  {
    path: '/admin/products/:productId/edit',
    name: 'admineditproducts',
    meta: { extend: false, requiresAuth: true },
    component: AdminProductEditView
  },

  ///Orders
  {
    path: '/admin/orders',
    name: 'adminorders',
    meta: { extend: false, requiresAuth: true },
    component: AdminOrderView
  },

  /// Settings
  {
    path: '/admin/settings',
    name: 'adminsettings',
    meta: { extend: false, requiresAuth: true },
    component: AdminStoreSettingsView
  },
  {
    path: '/admin/settings/shipping',
    name: 'adminshipping',
    meta: { extend: false, requiresAuth: true },
    component: AdminStoreShippingView
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!store.state.users.isAuthenticated) {
      next({
        name: 'login',
      })
    }
  }
  next()
})

export default router
