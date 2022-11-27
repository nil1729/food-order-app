<template>
  <div class="container mt-3">
    <h1 class="text-center page-title mb-4 font-weight-bold">Our Most Delicious Dishes</h1>
    <div v-if="loading" class="container text-center">
      <img src="@/assets/search.gif" alt="Loader" />
    </div>
    <div v-else class="row mb-3 justify-content-center">
      <h3 v-if="products.length === 0" class="mx-auto order-empty-text">
        Food Site don't have any food right now.
      </h3>
      <div
        v-for="item in products"
        :key="item._id"
        class="col-xl-3 col-lg-4 col-md-6 col-xs-12 mb-4"
      >
        <app-product-item :product="item" />
      </div>
      <app-pagination-block v-if="products.length !== 0" />
    </div>
    <hr class="my-2" />
    <h1 class="text-center page-title mt-5 mb-4 font-weight-bold">Food Combos</h1>
    <div v-if="foodCombos" class="row mb-3 justify-content-center">
      <h3 v-if="foodCombos && foodCombos.length === 0" class="mx-auto order-empty-text">
        Food Site don't have any Food Combos right now.
      </h3>
      <div
        v-for="item in foodCombos"
        :key="item._id"
        class="col-xl-3 col-lg-4 col-md-6 col-xs-12 mb-4"
      >
        <app-product-item :product="item" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductItem from '../layouts/ProductItem';
import Pagination from '../utils/Pagination';
export default {
  name: 'Product',
  computed: {
    products() {
      return this.$store.state.products && this.$store.state.products.results;
    },
    foodCombos() {
      return this.$store.state.foodCombos;
    },
    loading() {
      return this.$store.state.productFetching;
    },
  },
  components: {
    'app-product-item': ProductItem,
    'app-pagination-block': Pagination,
  },
};
</script>

<style scoped>
.container {
  width: 95%;
  max-width: none;
}
@media screen and (max-width: 600px) {
  h1.page-title {
    font-size: 1.5rem;
  }
}
</style>
