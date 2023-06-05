import store from '../store';
import { createRouter, createWebHistory } from 'vue-router'


import SignupView from '../views/SignupView.vue'
import LoginView from '../views/LoginView.vue'
import NotFound from '../views/404.vue'

// Store
import HomeView from '../views/HomeView.vue'
import ProductDetail from '../views/ProductDetail.vue'
import GroupDetail from '../views/GroupDetail.vue'

// Seller
import SellerSignupView from '../views/seller/SellerSignupView.vue'
import ProductView from '../views/ProductView.vue'
import CartView from '../views/CartView.vue'
import OrderView from '../views/OrderView.vue'
import ListOrderView from '../views/ListOrderView.vue'
import EditOrderView from '../views/EditOrderView.vue'

//Supplier
import SupplierSignupView from '../views/supplier/SupplierSignupView.vue'
import SupplierProductView from '../views/supplier/SupplierProductView.vue'
import SupplierAddproductView from '../views/supplier/SupplierAddproductView.vue'


//supplier
import AdminProductView from '../views/AdminProductView.vue'
import AddProductView from '../views/AddProductView.vue'
import EditProductView from '../views/EditProductView.vue'
import AdminOrderView from '../views/AdminOrderView.vue'
import AdminEditOrderView from '../views/AdminEditOrderView.vue'
import AdminSellerView from '../views/AdminSellerView.vue'


const routes = [
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

  //Store
  
  {
    path: '',
    name: 'home',
    meta: { extend: true },
    component: HomeView
  },  
  {
    path: '/product/:productId',
    name: 'productdetail',
    meta: { extend: true, requiresAuth: false},
    component: ProductDetail
  },  
  {
    path: '/groups/:groupId',
    name: 'groupdetail',
    meta: { extend: true, requiresAuth: false},
    component: GroupDetail
  },
  
  //seller
  {
    path: '/seller/signup',
    name: 'sellersignup',
    meta: { extend: true },
    component: SellerSignupView
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

  // Supplier  
  {
    path: '/supplier/signup',
    name: 'suplliersignup',
    meta: { extend: true },
    component: SupplierSignupView
  },  
  {
    path: '/supplier/products',
    name: 'supplierproducts',
    meta: { extend: false, requiresAuth: true, supplier: true },
    component: SupplierProductView
  },
  {
    path: '/supplier/products/new',
    name: 'supplieraddproducts',
    meta: { extend: false, requiresAuth: true, supplier: true },
    component: SupplierAddproductView
  },

  // provider  
  {
    path: '/provider/products',
    name: 'adminproducts',
    meta: { extend: false, requiresAuth: true, supplier: true },
    component: AdminProductView
  },
  {
    path: '/provider/products/add',
    name: 'addproduct',
    meta: { extend: false, requiresAuth: true, supplier: true  },
    component: AddProductView
  },
  {
    path: '/provider/products/:productId/edit',
    name: 'editproduct',
    meta: { extend: false, requiresAuth: true, supplier: true  },
    component: EditProductView
  },
  {
    path: '/provider/orders',
    name: 'adminorders',
    meta: { extend: false, requiresAuth: true, supplier: true },
    component: AdminOrderView
  },
  {
    path: '/provider/orders/:orderId/edit',
    name: 'admineditorder',
    meta: { extend: false, requiresAuth: true, supplier: true },
    component: AdminEditOrderView
  },
  {
    path: '/provider/sellers',
    name: 'adminsellers',
    meta: { extend: false, requiresAuth: true, supplier: true },
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
      if (to.meta.seller && store.state.users.role !== 'seller' || to.meta.supplier && store.state.users.role !== 'supplier'  ) {
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
