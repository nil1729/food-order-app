import moment from "moment";
export default {
    formatPrice: () => (price) => {
      var format = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
      });
      return format.format(price).substr(1);
    },

    formatTime: () => (time) => {
      return moment(time).format("MMM Do YYYY, h:mm a");
    },
    
    timeDuration: () => (time) => {
      return moment(time, "YYYYMMDD").fromNow();
    },

    hasCarted: (state) => (id) => {
      if (state.cart) {
        let index = state.cart.findIndex((item) => item._id === id);
        if (index > -1) {
          return true;
        }
        return false;
      }
      return false;
    },
    user: (state) => {
      return state.user;
    },
}