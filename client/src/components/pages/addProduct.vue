<template>
  <div class="container mt-2">
    <h1 class="text-center font-weight-light header m-auto">Add a Dish</h1>
    <form @submit.prevent="handleSubmit" class="mt-4">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label>Dish Name</label>
          <input
            v-model="dish"
            placeholder="Veg Fried Rice"
            required
            type="text"
            class="form-control"
            :class="[
              { 'is-valid': isDish },
              { 'is-invalid': isDish === false },
            ]"
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
              :class="[
                { 'is-valid': isRestaurant },
                { 'is-invalid': isRestaurant === false },
              ]"
              v-model="restaurant"
              required
              type="text"
              class="form-control"
              placeholder="Looters"
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
          id
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
            <select required class="form-control" v-model="foodCategory">
              <option disabled>Choose ...</option>
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
                required
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
          <i class="fal fa-share-square mr-1"></i> Save Dish
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import validator from "validator";

export default {
  name: "Admin-Add-Product",
  data() {
    return {
      dish: "",
      restaurant: "",
      price: "",
      description: "",
      file: null,
      fileName: "Choose a File",
      quantity: 5,
      foodCategory: "Choose ...",
    };
  },
  computed: {
    isPrice() {
      if (this.price === "") {
        return null;
      }
      return validator.isNumeric(this.price) && this.price > 0;
    },
    isQuantity() {
      if(this.quantity === '') return false;
      if(Math.ceil(this.quantity) !== Math.floor(this.quantity)) return false;
      return true;
    },
    isDish() {
      if (this.dish === "") {
        return null;
      }
      if (this.dish.length > 0 && this.dish.trim().length === 0) {
        return false;
      }
      return true;
    },
    isRestaurant() {
      if (this.restaurant === "") {
        return null;
      }
      if (this.restaurant.length > 0 && this.restaurant.trim().length === 0) {
        return false;
      }
      return true;
    },
  },
  methods: {
    async handleSubmit() {
      const product = {
        info: {
          dish: validator.ltrim(this.dish),
          restaurant: validator.ltrim(this.restaurant),
          description: validator.ltrim(this.description),
          price: parseFloat(parseFloat(this.price).toFixed(2)),
          category: validator.ltrim(this.foodCategory),
          stock: this.quantity,
        },
        file: this.file,
      };
      if(this.foodCategory === 'Choose ...') {
        return this.$store.commit("SET_ERRORS", {
          code: "Validation Error",
          message: "Plaese choose a Food category",
        })
      }
      await this.$store.dispatch("addAdminProducts", product);
      this.resetForm();
    },
    resetForm() {
      this.dish = "";
      this.restaurant = "";
      this.price = "";
      this.description = "";
      this.quantity = 5;
      this.foodCategory = "Choose ...";
      this.file = null;
      this.fileName = "Choose a File";
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