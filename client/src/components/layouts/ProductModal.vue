<template>
  <div v-if="product" class="container">
    <div class="modal-box text-center">
      <p class="lead text-success">Item Added to Cart</p>
      <div class="image m-auto">
        <img class="img-fluid" :src="product.photoURL" alt />
      </div>
      <p class="lead my-2 text-info">{{ product.dish }}</p>
      <p class="lead text-danger">
        Price{{ " " }}
        <span class="text-muted">₹ {{ formatPrice(product.price) }}</span>
      </p>
      <button @click="handleClose('close')" class="btn btn-outline-primary">
        Continue Shopping
      </button>
      <br />
      <button
        @click="handleClose('go-cart')"
        class="btn btn-outline-warning mt-2"
      >
        Go to Cart
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "app-product-model",
  computed: {
    ...mapGetters(["formatPrice"]),
    product() {
      return this.$store.state.productAddAlert;
    },
  },
  methods: {
    handleClose(type) {
      this.$store.commit("CART_NOTIFICATION", null);
      if (type === "go-cart" && this.$route.name !== "Cart") {
        return this.$router.push("/cart");
      } else if (type === "go-cart" && this.$route.name === "Cart") {
        return;
      } else if (this.$route.name !== "Products") {
        return this.$router.push("/");
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: none;
  width: 100%;
  height: 100%;
  background-color: rgba(97, 95, 95, 0.5);
  position: fixed;
  z-index: 400;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-box {
  background-color: white;
  padding: 1rem 2rem 2rem;
  width: 20rem;
}
.lead {
  font-weight: 500;
}
button {
  box-shadow: none !important;
  border-radius: 5px;
  font-weight: 500;
  letter-spacing: 0.5px;
}
.image {
  height: auto;
  width: 10rem;
}
</style>
