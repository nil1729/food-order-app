import axios from "axios";
import createConfig from '../helpers/api-auth';


export default {
    async handleReview({ commit }, { review, id }) {
      review.id = id;
      try {
        const res = await axios.post(
            "/api/v1/products/add-review",
            review,
            createConfig()
        );
        if (res.status === 200) {
          commit('ADD_REVIEW_TO_LIST', res.data.review);
          commit('UPDATE_PRODUCT_AVERAGE_RATING', res.data.averageRating);
          commit("SET_ERRORS", {
            code: "Notification",
            message: res.data.msg,
          });
        }
        return;
      } catch (error) {
        console.log(error);
      }
    },

    async fecthProductReviews(context, id) {
      try {
        if(context.state.productReviews && context.state.productReviews.productID === id) {
          return;
        }
        const res = await axios.get(
          `/api/v1/product/${id}/reviews`,
          createConfig()
        );
        if(res.status === 200) {
          context.commit('SET_PRODUCT_REVIEWS', res.data);
        }
      } catch (error) {
        console.log(error);
      }
    },

}