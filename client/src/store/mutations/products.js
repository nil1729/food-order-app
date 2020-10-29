export default {
    SET_VIEW_PRODUCT_FETCHING(state, payload) {
      state.viewProductFetching = payload;
    },
    SET_SINGLE_VIEW_PRODUCT(state, payload) {
      state.viewSingleProduct = payload;
    },
    SET_PRODUCT_LOADING(state, payload) {
      state.productFetching = payload;
    },
    SET_PRODUCTS: function (state, products) {
      state.products = products;
    },
}