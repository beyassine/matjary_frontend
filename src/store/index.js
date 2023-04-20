import { createStore } from 'vuex'
import products from './modules/products';
import categories from './modules/categories';
import users from './modules/users';
import cart from './modules/cart';
import sidebar from './modules/sidebar';

const store= createStore({
    modules: {
      products,
      categories,
      users,
      cart,
      sidebar
      }
})
// Create store
export default store