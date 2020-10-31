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

    SET_SEARCH_PRODUCT_RESULTS: function (state, payload) {
      state.searchResults = payload;
    },
    SET_FOOD_COMBOS(state, payload) {
      state.foodCombos = payload;
    }
}