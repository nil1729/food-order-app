<template>
  <div class="card" style="width: 18rem;">
    <div class="image">
      <img :src="product && product.photoURL" alt />
      <button @click="addToCart(product)" class="btn btn-primary cart-btn">
        <i v-if="!hasCarted(product && product._id)" class="fal fa-cart-arrow-down"></i>
        <p v-else class="lead mb-0">In Cart</p>
      </button>
    </div>
    <div class="card-body d-flex justify-content-between align-items-center border-top">
      <router-link
        :to="product && `/view/${product._id}`"
        class="card-text lead mb-0"
      >{{product && product.model}}</router-link>
      <p class="card-text lead">₹ {{product && formatPrice(product.price)}}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Product-Item",
  props: ["product"],
  computed: {
    ...mapGetters(["formatPrice", "hasCarted"]),
  },
  methods: {
    ...mapActions(["addToCart"]),
  },
};
</script>

<style scoped>
.image {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 18rem;
  overflow: hidden;
  position: relative;
  text-align: center;
}
.cart-btn {
  position: absolute;
  z-index: 9;
  bottom: -4rem;
  right: -4rem;
  transition: 0.5s linear all;
  color: white;
  font-size: 1.3rem;
  padding: 2px 5px;
  box-shadow: none !important;
}
.cart-btn .lead {
  font-weight: 500;
}
.image img {
  height: 100%;
  /* width: 100%; */
  transition: 0.5s linear all;
  margin: auto;
  padding: 2rem;
}
.image:hover img {
  transform: scale(1.1);
}
.image:hover .cart-btn {
  bottom: 0;
  right: 0;
}
.card-body {
  padding: 1.25rem 0.8rem;
}
.card-body .lead {
  font-weight: 500;
  font-size: 1rem;
}
</style>