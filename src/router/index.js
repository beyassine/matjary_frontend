import store from '../store';
import { createRouter, createWebHistory } from 'vue-router'


import SignupView from '../views/SignupView.vue'
import LoginView from '../views/LoginView.vue'
import NotFound from '../views/404.vue'
import HomeView from '../views/HomeView.vue'


// Store
import StoreHome from '../views/store/StoreHomeView.vue'
import CategorieDetail from '../views/store/CategorieDetailView.vue'
import SubStoreDetail from '../views/store/SubStoreDetailView.vue'
import ProductDetail from '../views/store/ProductDetailView.vue'
import CartDetail from '../views/store/StoreCart.vue'
import frCartDetail from '../views/store/frStoreCart.vue'

//Admin

///Product
import AdminProductView from '../views/admin/AdminProductView.vue'
import AdminProductAddView from '../views/admin/AdminProductAddView.vue'
import AdminProductEditView from '../views/admin/AdminProductEditView.vue'
///Categorie
import AdminCategorieView from '../views/admin/AdminCategorieView.vue'
import AdminCategorieDetailView from '../views/admin/AdminCategorieDetailView.vue'
///Order
import AdminOrderView from '../views/admin/AdminOrderView.vue'
import AdminOrderDetailView from '../views/admin/AdminOrderDetailView.vue'
///Settings
import AdminStoreSettingsView from '../views/admin/AdminStoreSettingsView.vue'
import AdminStoreShippingView from '../views/admin/AdminStoreShippingView.vue'
import AdminStoreInfoView from '../views/admin/AdminStoreInfoView.vue'


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
    name: 'storehome',
    meta: { extend: true, requiresAuth: false , white: true  },
    component: StoreHome
  },
  {
    path: '/:storeId/c/:categorieId',
    name: 'storecategoriedetail',
    meta: { extend: true, requiresAuth: false , white: true  },
    component: CategorieDetail
  },
  {
    path: '/:storeId/s/:substoreId',
    name: 'substoredetail',
    meta: { extend: true, requiresAuth: false , white: true  },
    component: SubStoreDetail
  },
  {
    path: '/:storeId/:productId',
    name: 'productdetail',
    meta: { extend: true, requiresAuth: false },
    component: ProductDetail
  },
  {
    path: '/:storeId/checkout',
    name: 'arstorecart',
    meta: { extend: true, requiresAuth: false, white: true  },
    component: CartDetail
  },
  {
    path: '/:storeId/fr/checkout',
    name: 'frstorecart',
    meta: { extend: true, requiresAuth: false, white: true  },
    component: frCartDetail
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
  ///Categories
  {
    path: '/admin/categories',
    name: 'admincategories',
    meta: { extend: false, requiresAuth: true },
    component: AdminCategorieView
  },  
  {
    path: '/admin/categories/:categorieId',
    name: 'admincategoriedetail',
    meta: { extend: false, requiresAuth: true },
    component: AdminCategorieDetailView
  },
  ///Orders
  {
    path: '/admin/orders',
    name: 'adminorders',
    meta: { extend: false, requiresAuth: true },
    component: AdminOrderView
  },
  {
    path: '/orders/:orderId',
    name: 'orderdetail',
    meta: { extend: false, requiresAuth: true },
    component: AdminOrderDetailView
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
  {
    path: '/admin/settings/info',
    name: 'admininfo',
    meta: { extend: false, requiresAuth: true },
    component: AdminStoreInfoView
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
