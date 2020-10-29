<template>
  <div class="conatiner">
    <app-file-loader />
    <app-product-modal />
    <app-navbar />
    <router-view />
  </div>
</template>

<script>
import ProductModal from "../layouts/ProductModal";
import Navbar from "../layouts/Navbar";
import FileLoader from "../utils/BackDrop";
export default {
  name: "Home",
  components: {
    "app-navbar": Navbar,
    "app-product-modal": ProductModal,
    "app-file-loader": FileLoader,
  },
};
</script>

<style>
/* Star Rating System */
.stars-inner {
    position: absolute;
    top: 0;
    left: 0;
    white-space: nowrap;
    overflow: hidden;
}
.stars-outer {
    position: relative;
    display: inline-block;
}
.stars-outer::before {
    content: '\f005 \f005 \f005 \f005 \f005';
    font-family: 'Font Awesome 5 Free'!important;
    font-weight: 900;
    color: #ccc;
}

.stars-inner::before {
    content: '\f005 \f005 \f005 \f005 \f005';
    font-family: 'Font Awesome 5 Free'!important;
    font-weight: 900;
    color: #f8ce0b;
}
</style>