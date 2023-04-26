import store from '../store';
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import SignupView from '../views/SignupView.vue'
import LoginView from '../views/LoginView.vue'
import NotFound from '../views/404.vue'

// Seller
import ProductView from '../views/ProductView.vue'
import CartView from '../views/CartView.vue'
import OrderView from '../views/OrderView.vue'
import ListOrderView from '../views/ListOrderView.vue'
import EditOrderView from '../views/EditOrderView.vue'

//Admin
import AdminProductView from '../views/AdminProductView.vue'
import AddProductView from '../views/AddProductView.vue'
import EditProductView from '../views/EditProductView.vue'
import AdminOrderView from '../views/AdminOrderView.vue'
import AdminEditOrderView from '../views/AdminEditOrderView.vue'
import AdminSellerView from '../views/AdminSellerView.vue'


const routes = [
  {
    path: '',
    name: 'home',
    meta: { extend: true },
    component: HomeView
  },  
  {
    path: '/signup',
    name: 'signup',
    meta: { extend: true },
    component: SignupView
  },
  {
    path: '/login',
    name: 'login',
    meta: { extend: true },
    component: LoginView
  },
  {
    path: '/404/:pathMatch(.*)*',
    name: '404',
    meta: { extend: false },
    component: NotFound
  },
  
  //seller
  {
    path: '/products',
    name: 'products',
    meta: { extend: false, requiresAuth: true, seller: true },
    component: ProductView
  },
  {
    path: '/cart',
    name: 'cart',
    meta: { nextend: false, requiresAuth: true },
    component: CartView
  },
  {
    path: '/orders',
    name: 'orders',
    meta: { extend: false, requiresAuth: true, seller: true },
    component: OrderView
  },
  {
    path: '/listorders',
    name: 'listorders',
    meta: { extend: false, requiresAuth: true, seller: true },
    component: ListOrderView
  },
  {
    path: '/orders/:orderId/edit',
    name: 'editorder',
    meta: { extend: false, requiresAuth: true, seller: true },
    component: EditOrderView
  },

  // admin
  {
    path: '/admin/products',
    name: 'adminproducts',
    meta: { extend: false, requiresAuth: true, provider: true },
    component: AdminProductView
  },
  {
    path: '/products/add',
    name: 'addproduct',
    meta: { extend: false, requiresAuth: true, provider: true  },
    component: AddProductView
  },
  {
    path: '/products/:productId/edit',
    name: 'editproduct',
    meta: { extend: false, requiresAuth: true, provider: true  },
    component: EditProductView
  },
  {
    path: '/admin/orders',
    name: 'adminorders',
    meta: { extend: false, requiresAuth: true, provider: true },
    component: AdminOrderView
  },
  {
    path: '/admin/orders/:orderId/edit',
    name: 'admineditorder',
    meta: { extend: false, requiresAuth: true, provider: true },
    component: AdminEditOrderView
  },
  {
    path: '/admin/sellers',
    name: 'adminsellers',
    meta: { extend: false, requiresAuth: true, provider: true },
    component: AdminSellerView
  },
  /* 
  {
    path: '/settings',
    name: 'settings',
    meta: { navbar: true, header: true, requiresAuth: true },
    component: SettingsView
  },
  {
    path: '/settings/edit',
    name: 'editstoreinfo',
    meta: { navbar: true, header: true, requiresAuth: true },
    component: EditStoreInfoView
  }, 
  */
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
    } else {
      if (to.meta.seller && store.state.users.role !== 'seller' || to.meta.provider && store.state.users.role !== 'provider'  ) {
        next({
          name: '404',
        })
      }
      next()
    }

  } else {
    next()
  }
})

export default router
