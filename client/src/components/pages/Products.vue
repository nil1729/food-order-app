<template>
  <div class="container mt-3">
    <h1 class="text-center mb-5">Our Products</h1>
    <div v-if="loading" class="container text-center">
      <img src="@/assets/search.gif" alt="Loader" />
    </div>
    <div v-else class="row mb-3">
      <div
        v-for="item in products"
        :key="item._id"
        class="col-xl-3 col-lg-4 col-md-6 col-xs-12 mb-4"
      >
        <app-product-item :product="item" />
      </div>
      <app-pagination-block />
    </div>
  </div>
</template>

<script>
import ProductItem from "../layouts/ProductItem";
import Pagination from "../utils/Pagination";
export default {
  name: "Product",
  computed: {
    products() {
      return this.$store.state.products.results;
    },
    loading() {
      return this.$store.state.productFetching;
    },
  },
  components: {
    "app-product-item": ProductItem,
    "app-pagination-block": Pagination,
  },
};
</script>

<style scoped>
.container {
  width: 95%;
  max-width: none;
}
</style>