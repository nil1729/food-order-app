<template>
  <div class="container">
    <h2 class="mx-auto my-4 header-shipping pb-1">Choose Shipping Address</h2>
    <form @submit.prevent="saveShippingAddress">
      <div class="row">
        <div class="col-md-8">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label>Full Name</label>
              <input
                required
                v-model="shippingAddress.fullName"
                type="text"
                class="form-control"
                :placeholder="user && user.displayName"
                :class="[
                  { 'is-valid': isName },
                  { 'is-invalid': isName === false },
                ]"
              />
              <div class="invalid-feedback">
                Please enter an Alphabetic Name
              </div>
            </div>
            <div class="form-group col-md-6">
              <label>Phone Number</label>
              <input
                required
                v-model="shippingAddress.phoneNumber"
                type="text"
                class="form-control"
                placeholder="Phone Number"
                :class="[
                  { 'is-valid': isMobilePhone },
                  { 'is-invalid': isMobilePhone === false },
                ]"
              />
            </div>
          </div>
          <div class="form-group">
            <label>Address Line 1</label>
            <input
              required
              v-model="shippingAddress.address"
              type="text"
              class="form-control"
              placeholder="1234 Main St."
            />
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label>Landmark</label>
              <input
                required
                v-model="shippingAddress.landmark"
                type="text"
                class="form-control"
                placeholder="Apartment, studio, or floor"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="inputState">Country</label>
              <select v-model="shippingAddress.country" class="form-control">
                <option disabled>Choose ...</option>
                <option>India</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="inputState">State</label>
              <input
                required
                v-model="shippingAddress.state"
                placeholder="Tripura"
                type="text"
                class="form-control"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="inputCity">City</label>
              <input
                required
                v-model="shippingAddress.city"
                placeholder="Agartala"
                type="text"
                class="form-control"
              />
            </div>
            <div class="form-group col-md-2">
              <label for="inputZip">Zip Code</label>
              <input
                required
                v-model="shippingAddress.zipCode"
                type="text"
                :class="[
                  { 'is-valid': isZipCode },
                  { 'is-invalid': isZipCode === false },
                ]"
                class="form-control"
                placeholder="799001"
              />
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="container flex-column mx-auto mt-3 px-4 py-3 border">
            <div v-if="isEmpty">
              <h3 class="text-center">Your Cart is Currently Empty</h3>
            </div>
            <div v-else>
              <h3 class="border-bottom pb-1">Order Summary</h3>
              <p class="mb-1 text-primary mt-3">
                Products Total :
                <span class="ml-2 font-weight-normal text-dark"
                  >₹ {{ formatPrice(productTotal) }}</span
                >
              </p>
              <p class="mb-1 text-primary">
                Tax (GST 5%) :
                <span class="ml-2 font-weight-normal text-dark"
                  >₹ {{ formatPrice(taxTotal) }}</span
                >
              </p>

              <hr class="my-2" />
              <p class="lead mb-1 text-primary">
                Grand Total :
                <span class="ml-2 font-weight-normal text-dark"
                  >₹
                  {{ formatPrice((taxTotal + productTotal).toFixed(2)) }}</span
                >
              </p>
              <div class="row mt-3">
                <button type="submit" class="mx-auto btn btn-primary">
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import validator from "validator";

export default {
  name: "Shipping-Address-Setup",
  data() {
    return {
      shippingAddress: {
        ...this.$store.state.shippingAddress,
      },
    };
  },
  methods: {
    saveShippingAddress() {
      if (
        this.isName &&
        this.isMobilePhone &&
        this.isZipCode &&
        this.shippingAddress.country !== "Choose ..."
      ) {
        localStorage.setItem(
          "SHIPPING_ADDRESS",
          JSON.stringify(this.shippingAddress)
        );
        this.$store.commit("SET_SHIPPING_ADDRESS");
        this.$router.push("/checkout");
      }
    },
  },
  computed: {
    ...mapGetters(["formatPrice", "user"]),
    isEmpty: function() {
      return this.$store.state.cart && this.$store.state.cart.length === 0;
    },
    cartItems: function() {
      return this.$store.state.cart;
    },
    productTotal() {
      let total = 0;
      this.$store.state.cart.forEach(
        (item) => (total += item.price * item.quantity)
      );
      return parseFloat(total.toFixed(2));
    },
    taxTotal() {
      return parseFloat(((this.productTotal * 5) / 100).toFixed(2));
    },
    isZipCode() {
      if (this.shippingAddress.zipCode == "") {
        return null;
      }
      return validator.isPostalCode(this.shippingAddress.zipCode, "IN");
    },
    isMobilePhone() {
      if (this.shippingAddress.phoneNumber == "") {
        return null;
      }
      return validator.isMobilePhone(this.shippingAddress.phoneNumber);
    },
    isName() {
      let words = this.shippingAddress.fullName.split(" ");
      if (words.length === 0) {
        return null;
      }
      let test = true;
      words.forEach((word) => {
        if (word.trim().length === 0 || !validator.isAlpha(word)) {
          test = false;
        }
      });
      return test;
    },
  },
};
</script>

<style scoped>
form input,
select {
  outline: none !important;
  box-shadow: none !important;
  border-width: 1.8px;
}
.header-shipping {
  width: fit-content;
  border-bottom: 1px solid grey;
  font-weight: 400;
}
</style>
