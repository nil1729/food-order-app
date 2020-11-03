<template>
  <div class="container mt-2">
    <h1 class="text-center font-weight-light header m-auto">Upadate Dish</h1>
    <div v-if="loading" class="loader text-center mt-5">
        <img src="@/assets/script-loader.gif" alt />
    </div>
    <form v-else @submit.prevent="handleSubmit" class="mt-4">
        <div class="image mb-3 mx-auto">
            <img class='img-fluid' :src="product && product.photoURL" alt="">
        </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label>Dish Name</label>
          <input
            disabled
            type="text"
            class="form-control"
            :value="product && product.dish"
          />
          <div class="invalid-feedback">
            Dish Name should not contain only Whitespaces
          </div>
        </div>
        <div class="form-group col-md-6">
          <label>Restaurant Name</label>
          <div class="input-group mb-2 mr-sm-2">
            <div class="input-group-prepend">
              <div class="input-group-text">Offered from</div>
            </div>
            <input
            disabled
              type="text"
              class="form-control"
              :value="product && product.restaurant"
            />
            <div class="invalid-feedback">
              Resturant Name should not contain only Whitespaces
            </div>
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
        <label>Description</label>
        <textarea
          v-model="description"
          required
          class="form-control"
          cols="30"
        ></textarea>
      </div>
      <div class="form-group col-md-6">
          <label>Quantity</label>
          <div class="input-group mb-2 mr-sm-2">
            <div class="input-group-prepend">
              <div class="input-group-text">Food in Stock</div>
            </div>
            <input
              :class="[
                { 'is-valid': isQuantity },
                { 'is-invalid': isQuantity === false },
              ]"
              v-model="quantity"
              required
              type="number"
              min="1"
              class="form-control"
              placeholder="5"
            />
            <div class="invalid-feedback">
              Food Quantity must be is an Integer value greater than 0
            </div>
          </div>
          <label>Food Category</label>
          <div class="input-group mb-2 mr-sm-2">
            <select disabled class="form-control" v-model="foodCategory">
              <option>Burgers</option>
              <option>Pizza</option>
              <option>Drinks</option>
              <option>Rolls</option>
              <option>Momos</option>
              <option>Ice Cream</option>
              <option>Noodles</option>
              <option>Combos</option>
            </select>
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label>Price</label>
          <div class="input-group mb-2 mr-sm-2">
            <div class="input-group-prepend">
              <div class="input-group-text">₹</div>
            </div>
            <input
              :class="[
                { 'is-valid': isPrice },
                { 'is-invalid': isPrice === false },
              ]"
              v-model="price"
              required
              type="text"
              class="form-control"
              placeholder="99.99"
            />
            <div class="invalid-feedback">
              Price should be a Number greater than zero
            </div>
          </div>
        </div>
        <div class="form-group col-md-6">
          <label>Preview Image</label>
          <div class="input-group">
            <div class="custom-file">
              <input
                @change="setFile"
                :name="file"
                type="file"
                class="custom-file-input"
              />
              <label class="custom-file-label">{{ fileName }}</label>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group text-center mt-2">
        <button type="submit" class="btn btn-success submit-btn">
          <i class="fal fa-share-square mr-1"></i> Update Dish
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import validator from "validator";

export default {
    name: "Admin-Add-Product",
    async mounted() {
        await this.$store.dispatch("fetchSingleProduct", this.$route.params.id);
        this.description = this.product.description;
        this.foodCategory = this.product.category;
        this.price = String(this.product.price);
        this.quantity = this.product.stock;
    },
  data() {
    return {
      price: "",
      description: '',
      file: null,
      fileName: "Choose a File",
      quantity: 5,
      foodCategory: "Choose ...",
    };
  },
  computed: {
    loading() {
        return this.$store.state.viewProductFetching;
    },
    product() {
        return this.$store.state.viewSingleProduct;
    },
    isPrice() {
      if (this.price === "") {
        return null;
      }
      return validator.isNumeric(this.price) && this.price > 0;
    },
    isQuantity() {
      if(this.quantity === '') return false;
      if(Math.ceil(this.quantity) !== Math.floor(this.quantity)) return false;
      if(this.quantity <= 0) return false;
      return true;
    },
  },
  methods: {
    async handleSubmit() {
      const product = {
        info: {
          description: validator.ltrim(this.description),
          price: parseFloat(parseFloat(this.price).toFixed(2)),
          stock: this.quantity,  
        },
        photoURL: this.product.photoURL,
        file: this.file,
        id: this.product._id,
      };
      await this.$store.dispatch("upadateAdminProducts", product);
      this.$router.push(`/view/${product.id}`);
    },
    setFile(e) {
      const fileType = new RegExp("image", "i");
      const newFile = e.target.files[0];
      if (!fileType.test(newFile.type)) {
        // e.target.form.reset();
        this.file = null;
        this.fileName = "Choose a File";
        return this.$store.commit("SET_ERRORS", {
          code: "Validation Error",
          message: "The File you are choosing is not an Image",
        });
      }
      this.file = newFile;
      this.fileName = newFile.name;
    },
  },
};
</script>

<style scoped>
.image {
    height: 13rem;
    width: 18rem;
}
.image img {
    height: 100%;
    width: 100%;
}
h1.header {
  width: fit-content;
  border-bottom: 1.2px solid green;
  padding: 3px 10px;
}
label,
input,
button,
textarea {
  box-shadow: none !important;
}
.submit-btn i {
  font-size: 1.3rem;
}
.submit-btn {
  font-size: 1rem;
}
textarea {
  height: 75%;
}
</style>