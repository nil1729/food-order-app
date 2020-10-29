<template>
  <div class="container">
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="[{disabled: paginate && !paginate.prev}]">
          <a
            @click.prevent="fetchProducts(paginate.prev)"
            class="page-link"
            href="#"
            aria-label="Previous"
          >
            <span aria-hidden="true">
              <i class="fad fa-arrow-left"></i>
            </span>
          </a>
        </li>
        <li
          v-for="page in paginate.length"
          :key="page"
          class="page-item"
          :class="{active: paginate && paginate.current === page}"
        >
          <a @click.prevent="fetchProducts(page)" class="page-link" href="#">{{page}}</a>
        </li>
        <li class="page-item" :class="{disabled: paginate && !paginate.next}">
          <a
            @click.prevent="fetchProducts(paginate.next)"
            class="page-link"
            href="#"
            aria-label="Next"
          >
            <span aria-hidden="true">
              <i class="fad fa-arrow-right"></i>
            </span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "App-Pagination-Block",
  computed: {
    paginate() {
      return {
        ...this.$store.state.products,
        results: null,
      };
    },
  },
  methods: {
    ...mapActions(["fetchProducts"]),
  },
};
</script>

<style scoped>
.page-item,
.page-link {
  box-shadow: none !important;
}
</style>