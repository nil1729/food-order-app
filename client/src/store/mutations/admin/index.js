export default {
    SET_ADMIN(state, status) {
      state.isAdmin = status;
    },

    SET_ADMIN_STORE_STATS(state, payload) {
      state.adminStoreStats = payload;
    }
}