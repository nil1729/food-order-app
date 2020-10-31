import Vue from "vue";
import Vuex from "vuex";

// Actions
import authActions from './actions/auths';
import userActions from './actions/users';
import cartActions from './actions/cart';
import commonActions from './actions/common';
import ratingActions from './actions/ratings';
import paymentActions from './actions/payments';

// Admin Actions
import adminOrderActions from './actions/admin/orders';
import adminAddProductActions from './actions/admin/addProduct';
import adminStatsActions from './actions/admin/stats';


// Getters
import getters from './getters';


// Mutations
import userMutations from './mutations/users';
import cartMutations from './mutations/cart';
import commonMutations from './mutations/common';
import ratingMutations from './mutations/rating';
import productMutations from './mutations/products';


// Admin Mutations
import adminOrderMutations from './mutations/admin/orders';
import adminAddProductMutations from './mutations/admin/addProduct';
import adminRootMutations from './mutations/admin';



Vue.use(Vuex);

const store = new Vuex.Store({
  
  state: {
    pageLoading: true,
    isAdmin: false,
    user: null,
    errors: null,
    products: null,
    cart: null,
    productAddAlert: null,
    productFetching: true,
    productUploading: false,
    viewProductFetching: false,
    viewSingleProduct: null,
    shippingAddress: null,
    userOrders: null,
    adminOrders: null,
    adminStoreStats: null,
    productReviews: null,
    searchResults: null,
    foodCombos: null,
  },


  mutations: {

    ...userMutations,
    ...cartMutations,
    ...commonMutations,
    ...ratingMutations,
    ...productMutations,

    // Admin Mutations
    ...adminRootMutations,
    ...adminOrderMutations,
    ...adminAddProductMutations,
  
  },
  
  getters: {
    ...getters,
  },

  actions: {

    // Common Actions
    ...authActions,
    ...userActions,
    ...cartActions,
    ...commonActions,
    ...ratingActions,
    ...paymentActions,
    
    // Admin Functions
    ...adminOrderActions,
    ...adminAddProductActions,
    ...adminStatsActions,

  
  },

});

export default store;
