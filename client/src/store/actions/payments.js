import axios from "axios";
import createConfig from '../helpers/api-auth';

export default {
    async fetchCheckoutItems() {
      try {
        const res = await axios.get("/api/v1/checkout", createConfig());
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    
    
    async verifyPurchase(context, {
      orderID,
      orderStaticID
    }) {
      try {
        const res = await axios.post(
          "/api/v1/checkout/verify-order", {
            orderID,
            orderStaticID,
            shippingAddress: context.state.shippingAddress,
          },
          createConfig()
        );
        if (res.status === 200) {
          context.commit("SET_ERRORS", {
            code: "Notification",
            message: res.data.msg,
          });
          context.commit('ADD_ORDER_TO_LIST', res.data.orderDetails);
        }
      } catch (error) {
        console.log(error);
      }
    },
}