export default {
    SET_ADMIN_ORDER_STATE(state, payload) {
      state.adminOrders = payload;
    },
    UPDATE_ADMIN_ORDERS_STATUS(state, payload) {
      state.adminOrders = state.adminOrders.map(order => {
        if (order._id === payload._id) {
          return {
            ...order,
            updatedAt: payload.updatedAt,
            isDelivered: payload.isDelivered,
          }
        } else return order;
      });
    },
}