import axios from "axios";
import createConfig from '../../helpers/api-auth';
// import firebase from "@/firebase";
// import path from "path";


export default {
    async fetchAdminOrders(context) {
      try {
        if (!context.state.adminOrders) {
          const res = await axios.get('/api/v1/admin/orders', createConfig());
          if (res.data.orders) {
            context.commit('SET_ADMIN_ORDER_STATE', res.data.orders);
          }
        }
      } catch (err) {
        console.log(err);
      }
    },

    async updateDeliveryStatus(context, id) {
      try {
        const res = await axios.post('/api/v1/admin/orders/update', {
          orderStaticID: id
        }, createConfig());

        if (res.data.order) {
          context.commit('UPDATE_ADMIN_ORDERS_STATUS', res.data.order);
        }

      } catch (error) {
        console.log(error);
      }
    },
}