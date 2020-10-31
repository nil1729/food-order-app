// import firebase from "@/firebase";
import axios from "axios";
import createConfig from '../helpers/api-auth';



export default {
    async fetchProducts(context, page) {
      try {
        if (context.state.products && context.state.products.current === page) {
          return;
        }
        context.commit("SET_PRODUCT_LOADING", true);
        if (!localStorage.AUTH_TOKEN) {
          return;
        }
        let res = await axios.get(
          `/api/v1/products?page=${page}`,
          createConfig()
        );
        context.commit("SET_PRODUCTS", res.data.products);
        res = await axios.get(`/api/v1/products/combos`, createConfig());
        context.commit('SET_FOOD_COMBOS', res.data);
        context.commit("SET_PRODUCT_LOADING", false);
      } catch (e) {
        console.log(e);
      }
    },

    async fetchSingleProduct(context, id) {
      context.commit("SET_VIEW_PRODUCT_FETCHING", true);
      try {
        const res = await axios.get(
          "/api/v1/view/product/" + id,
          createConfig()
        );
        if (!res.data.product) {
          context.commit("SET_SINGLE_VIEW_PRODUCT", null);
        } else {
          context.commit("SET_SINGLE_VIEW_PRODUCT", res.data.product);
        }
      } catch (e) {
        context.commit("SET_SINGLE_VIEW_PRODUCT", null);
      }
      context.commit("SET_VIEW_PRODUCT_FETCHING", false);
    },

    async fecthSearchResults(context, query) {
      try {
        const res = await axios.get('/api/v1/products/search?' + query, createConfig());
        if(res.status === 200) {
          context.commit('SET_SEARCH_PRODUCT_RESULTS', res.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
}