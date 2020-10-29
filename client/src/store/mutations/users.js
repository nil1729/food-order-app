export default {
    
    SET_USER_STATE: function (state, user) {
      state.user = user;
      if (!user) {
        state.isAdmin = false;
      }
    },
    
    SET_USER_UPDATE: function (state, data) {
      if (data.photoURL) {
        state.user.photoURL = data.photoURL;
      } else {
        state.user.displayName = data.displayName;
        state.user.phoneNumber = data.phoneNumber;
      }
    },

    // User Orders
    
    SET_USER_ORDERS(state, payload) {
      state.userOrders = payload;
    },

    ADD_ORDER_TO_LIST(state, payload) {
      if (state.userOrders && state.userOrders.length !== 0) {
        state.userOrders = [payload, ...state.userOrders];
      } else {
        state.userOrders = [payload]
      }
    },
}