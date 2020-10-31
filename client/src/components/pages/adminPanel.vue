<template>
  <div class="container mt-3">
    <h1 class="header">Admin Panel</h1>
    <div class="row mt-3">
      <div class="col-md-4 border px-2 py-3">
        <div class="ml-3">
          <h4>Customer Management</h4>
          <p class="mb-1 text-primary mt-3">
            Total Users :
            <span class="ml-2 font-weight-normal text-dark">
              {{
                isLoading
                  ? "Loading ..."
                  : $store.state.adminStoreStats.customerCount
              }}
            </span>
          </p>
          <router-link
            class="mt-2 btn btn-sm btn-outline-warning"
            to="/somewhere"
          >
            Customer Panel
          </router-link>
        </div>
      </div>
      <div class="col-md-4 border px-2 py-3">
        <div class="ml-3">
          <h4>Order Management</h4>
          <p class="mb-1 text-primary mt-3">
            Total Orders :
            <span class="ml-2 font-weight-normal text-dark">{{
              isLoading
                ? "Loading ..."
                : $store.state.adminStoreStats.orderCount
            }}</span>
          </p>
          <router-link
            class="mt-2 btn btn-sm btn-outline-warning"
            to="/admin/orders"
          >
            Order Panel
          </router-link>
        </div>
      </div>
      <div class="col-md-4 border px-2 py-3">
        <div class="ml-3">
          <h4>Foods Management</h4>
          <p class="mb-1 text-primary mt-3">
            Total Dishes :
            <span class="ml-2 font-weight-normal text-dark">{{
              isLoading
                ? "Loading ..."
                : $store.state.adminStoreStats.productCount
            }}</span>
          </p>
          <router-link class="mt-2 btn btn-sm btn-outline-warning" to="/">
            See all Dishes
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Admin-Panel",
  data() {
    return {
      isLoading: true,
    };
  },
  async mounted() {
    await this.$store.dispatch("fetchStoreStatsAdmin");
    this.isLoading = false;
  },
};
</script>

<style scoped>
h1.header {
  width: fit-content;
  margin: auto;
  border-bottom: 1.8px solid #acaaaa;
  font-weight: 400;
}
</style>