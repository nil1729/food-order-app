import axios from "axios";
import createConfig from '../helpers/api-auth';
// import firebase from "@/firebase";
// import path from "path";


export default {

    async addToCart(context, product) {
      try {
        const hasAlready = context.state.cart.find(
          (item) => item._id === product._id
        );
        if (!hasAlready) {
          context.commit("ADD_TO_CART", product);
          await context.dispatch("saveCartProduct");
          context.commit("CART_NOTIFICATION", product);
        }
      } catch (e) {
        console.log(e);
      }
    },

    async saveCartProduct(context) {
      try {
        await axios.post(
          "/api/v1/save-cart", {
            cart: context.state.cart.map(item => {
              return {
                product: item._id,
                quantity: item.quantity,
              }
            }),
          },
          createConfig()
        );
      } catch (e) {
        console.log(e);
      }
    },
}