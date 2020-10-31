export default {
    SET_PRODUCT_UPLOADING(state, payload) {
      state.productUploading = payload;
    },
    ADD_PRODUCT_IN_LIST(state, payload) {
      if (state.products.current === 1 && payload.category!=='Combos') {
        if(state.products.results.length === 8) state.products.results.pop();
        state.products.results = [payload, ...state.products.results];
      }
      if(payload.category === 'Combos') {
        state.foodCombos = [payload, ...state.foodCombos];
      }
    },
}