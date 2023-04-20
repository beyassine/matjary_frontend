import axiosInstance from "../../axios/axiosInstance";

const state = {
  categories: []
};

const getters = {
  allcategories: state => state.categories
};

const actions = {
  async fetchCategories({ commit }, storeId) {
    const response = await axiosInstance.get(
      `/store/${storeId}/categories`
    );
    
    commit('setCategories', response.data);
  },
};

const mutations = {
    setCategories: (state, categories) => (state.categories = categories),
};

export default {
  state,
  getters,
  actions,
  mutations
};