export default {
    SET_PRODUCT_REVIEWS(state, payload) {
      state.productReviews = payload;      
    },

    ADD_REVIEW_TO_LIST(state, payload) {
      if (state.productReviews && state.productReviews.reviews.length !== 0) {
        state.productReviews.reviews = [payload, ...state.productReviews.reviews];
      } else {
        state.productReviews.reviews = [payload]
      }
    },

    UPDATE_PRODUCT_AVERAGE_RATING(state, payload) {
      state.viewSingleProduct = {
        ...state.viewSingleProduct,
        averageRating: payload,
      }
    },
}