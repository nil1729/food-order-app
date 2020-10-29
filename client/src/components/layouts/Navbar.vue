<template>
  <nav class="navbar navbar-expand-lg navbar-dark sticky-top">
    <div class="text-light navbar-brand">
      <i class="fad fa-2x fa-phone-office"></i>
    </div>
    <!-- <button class="navbar-toggler" type="button">
      <span class="navbar-toggler-icon"></span>
    </button>-->
    <div>
      <ul class="navbar-nav mr-auto ml-3">
        <router-link tag="li" to="/" exact class="nav-item active">
          <a class="nav-link lead">Phone Store</a>
        </router-link>
      </ul>
    </div>
    <div class="ml-auto">
      <ul class="navbar-nav mr-auto ml-5 align-items-center">
        <li v-if="$store.state.isAdmin" class="nav-item">
          <router-link
            to="/admin/add-product"
            type="button"
            class="btn mr-2 btn-info"
            id="add-btn"
          >
            <i class="fal fa-plus"></i>
            Add Product
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/cart" type="button" class="btn" id="cart-btn">
            <i class="fas fa-cart-plus"></i>
            My Cart
            <span class="badge badge-light">{{
              cartItems === 0 ? "" : cartItems
            }}</span>
          </router-link>
        </li>
        <li class="nav-item dropdown">
          <a
            @click="dropdownOpen = !dropdownOpen"
            class="nav-link dropdown-toggle p-0"
            href="javascript:void(0)"
          >
            <img
              id="user-dp"
              :src="photoURL"
              alt="Phone Store"
              loading="lazy"
            />
          </a>
          <div
            class="dropdown-menu"
            :style="{ display: `${dropdownOpen ? 'block' : 'none'}` }"
          >
            <span class="dropdown-item text-info">{{ displayName }}</span>
            <router-link
              @click="dropdownOpen = false"
              class="dropdown-item"
              to="/profile"
              >Your Profile</router-link
            >
            <router-link
              @click="dropdownOpen = false"
              class="dropdown-item"
              to="/profile/orders"
              >Your Orders</router-link
            >
            <router-link
              @click="dropdownOpen = false"
              class="dropdown-item"
              to="/admin"
              v-if="$store.state.isAdmin"
              >Admin Panel</router-link
            >
            <router-link
              @click="dropdownOpen = false"
              class="dropdown-item"
              to="/profile/settings"
              >Settings</router-link
            >
            <div class="dropdown-divider"></div>
            <span @click="callSignOut" class="dropdown-item text-danger"
              >Sign out</span
            >
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "App-Navbar",
  data() {
    return {
      dropdownOpen: false,
    };
  },
  watch: {
    $route() {
      this.dropdownOpen = false;
    },
  },
  methods: {
    async callSignOut() {
      this.$store.dispatch("userSignOut");
    },
  },
  computed: {
    photoURL: function () {
      return this.$store.state.user && this.$store.state.user.photoURL;
    },
    displayName: function () {
      return this.$store.state.user && this.$store.state.user.displayName;
    },
    cartItems: function () {
      return this.$store.state.cart && this.$store.state.cart.length;
    },
  },
};
</script>

<style scoped>
.sticky-top {
  z-index: 300;
}
.navbar-brand {
  margin-left: 2rem;
}
nav {
  background-color: #3f99ff;
}
.nav-link.lead {
  font-family: "Red Rose", cursive;
  font-size: 1.5rem;
  letter-spacing: 1.5px;
}
.dropdown-menu {
  left: -7rem;
  top: 2.5rem;
}
.btn {
  box-shadow: none !important;
}
#cart-btn {
  border: 1.5px solid rgb(218, 208, 208);
  color: rgb(250, 250, 250);
}
#cart-btn i,
#add-btn i {
  font-size: 1.3rem;
  margin-right: 5px;
}
#cart-btn,
#add-btn {
  font-size: 1.1rem;
}
#user-dp {
  height: 35px;
  width: 35px;
  border-radius: 50%;
  margin-left: 1rem;
}
.dropdown-item.text-danger {
  cursor: pointer;
}
</style>
