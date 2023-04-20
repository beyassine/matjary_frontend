import axiosInstance from "../../axios/axiosInstance";

function filterbycat(products,catId){
  if (catId == 0){
    return products
  }
  return products.filter(product => product.categorie_id== catId)
}

function getproduct(products,productId){
  if (catId == 0){
    return null
  }
  return products.filter(product => product.id== productId)
}

const state = {
  products: [],
  catId:0,
  productId:0,
  idproduct:null
};

const getters = {
  allproducts: state => state.products,
  filteredproducts: (state) => filterbycat(state.products,state.catId),
  idprduct: (state) => getproduct(state.products,state.productId),
  getProductById: (state) => (id) => {
    return state.products.find(item => item.id == id)
  }
};

const actions = {

  async fetchProducts({ commit },storeId) {
    const response = await axiosInstance.get(
      `/product/get/${storeId}`
    );
    commit('setProducts', response.data);
  },
  async getCategorie({commit}, id){
    commit('setCatId', id); 
  },
  async getProduct({commit}, id){
    commit('setProductId', id)
  },
  async deleteProduct({commit}, id){
    commit('removeProduct', id)
  },

};

const mutations = {
  setProducts: (state, products) => (state.products = products),
  setCatId: (state, catId) => (state.catId = catId),
  setProductId: (state,productId) => (state.productId = productId),
  removeProduct:(state, id) => (state.products = state.products.filter(item => item.id !== id)),
};

export default {
  state,
  getters,
  actions,
  mutations
};