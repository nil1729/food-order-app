<template>
  <div class="container mb-5">
    <h1 class="mt-3 text-center order-text mx-auto mb-4">Your Orders</h1>
    <div v-if="loading" class="order-loader row">
      <img src="@/assets/search.gif" alt="" class="mx-auto" />
    </div>
    <div v-else>
      <h1 v-if="isEmpty" class="text-center order-empty-text mt-5">
        You don't purchase any products yet.
      </h1>
      <div v-else class="mt-3">
        <div
          v-for="order in $store.state.userOrders"
          :key="order._id"
          class="container border mb-4"
        >
          <h5 class="mt-4 ml-2 order-header pb-1 mb-2">
            OrderID:
            <span class="font-weight-normal">#{{ order._id }}</span>
          </h5>
          <table class="table">
            <thead>
              <tr class="text-uppercase">
                <th scope="col" class="lead">Amount Paid</th>
                <th scope="col" class="lead">Transaction ID</th>
                <th scope="col" class="lead">Transaction Time</th>
                <th scope="col" class="lead">Delivered</th>
                <th scope="col" class="lead">Details</th>
              </tr>
            </thead>
            <tbody>
              <th scope="row">₹ {{ formatPrice(order.amount) }}</th>
              <td>{{ order.orderID }}</td>
              <td>{{ formatTime(order.transactionTime) }}</td>
              <td class="price">{{ order.isDelivered ? "YES" : "NO" }}</td>
              <td class="font-weight-bold lead">
                <button
                  :id="order._id + '-button'"
                  class="btn btn-outline-info"
                  @click="openDetailTable(order._id)"
                >
                  Show
                </button>
              </td>
            </tbody>
          </table>
          <table
            :id="order._id + '-detail'"
            class="table products-table mt-4 hide"
          >
            <thead>
              <tr class="text-uppercase">
                <th scope="col">products</th>
                <th scope="col">model</th>
                <th scope="col">price</th>
                <th scope="col">quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in order.products" :key="item._id">
                <th scope="row">
                  <div class="image">
                    <img
                      :src="item.product.photoURL"
                      :alt="item.product._id"
                      class="img-thumbnail img-fluid"
                    />
                  </div>
                </th>
                <td>
                  <router-link :to="'/view/' + item.product._id">{{
                    item.product.model
                  }}</router-link>
                </td>
                <td class="price">₹ {{ formatPrice(item.product.price) }}</td>
                <td class="font-weight-bold">{{ item.quantity }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Order-View-Page",
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapGetters(["formatPrice", "formatTime"]),
    isEmpty: function () {
      return (
        this.$store.state.userOrders &&
        this.$store.state.userOrders.length === 0
      );
    },
  },
  async mounted() {
    await this.$store.dispatch("fetchUserOrders");
    this.loading = false;
  },
  methods: {
    openDetailTable(id) {
      const table = document.getElementById(`${id}-detail`);
      const button = document.getElementById(`${id}-button`);
      if (table.classList.contains("hide")) {
        table.classList.remove("hide");
        button.innerHTML = "Hide";
        button.classList.remove("btn-outline-info");
        button.classList.add("btn-warning");
      } else {
        table.classList.add("hide");
        button.innerHTML = "Show";
        button.classList.remove("btn-warning");
        button.classList.add("btn-outline-info");
      }
    },
  },
};
</script>

<style scoped>
h5.order-header {
  border-bottom: 1.5px solid #dee2e6;
  width: fit-content;
  color: blue;
}
.order-text {
  font-weight: 400;
}
.order-text {
  border-bottom: 1px solid grey;
  width: fit-content;
}
table.products-table {
  border: 1px solid #dee2e6;
}

table.products-table.hide {
  display: none;
}

.table thead th {
  border-top: none;
}
table.products-table th,
table.products-table td {
  vertical-align: middle;
  text-align: center;
}
.image {
  height: 60px;
  width: 60px;
  margin: auto;
}
img {
  height: 100%;
}
.price:last-child {
  font-weight: 700 !important;
}
.price {
  letter-spacing: 0.5px;
  font-size: 1rem;
}
button {
  box-shadow: none !important;
}
.lead {
  font-weight: 500;
}
</style>
