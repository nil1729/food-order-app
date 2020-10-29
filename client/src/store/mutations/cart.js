export default {
    SET_CART_STATE: function (state, cart) {
      state.cart = cart;
    },
    ADD_TO_CART: function (state, product) {
      product.quantity = 1;
      state.cart = [product, ...state.cart];
    },
    CART_NOTIFICATION: function (state, product) {
      state.productAddAlert = product;
    },
    REMOVE_CART_ITEM: function (state, id) {
      state.cart = state.cart.filter((item) => item._id !== id);
    },
    CHANGE_ITEM_QUANTITY: function (state, {
      id,
      quantity
    }) {
      state.cart = state.cart.filter((item) => {
        if (item._id === id) return (item.quantity += quantity);
        else return item;
      });
    },
    CLEAR_CART: function (state) {
      state.cart = [];
    },
}