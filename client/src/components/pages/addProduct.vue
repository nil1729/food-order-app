<template>
  <div class="container mt-2">
    <h1 class="text-center font-weight-light header m-auto">Add Product</h1>
    <form @submit.prevent="handleSubmit" class="mt-4">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label>Model Name</label>
          <input
            v-model="model"
            placeholder="OnePlus 8 Pro"
            required
            type="text"
            class="form-control"
            :class="[
              { 'is-valid': isModel },
              { 'is-invalid': isModel === false },
            ]"
          />
          <div class="invalid-feedback">
            Model Name should not contain only Whitespaces
          </div>
        </div>
        <div class="form-group col-md-6">
          <label>Brand Name</label>
          <div class="input-group mb-2 mr-sm-2">
            <div class="input-group-prepend">
              <div class="input-group-text">Made by</div>
            </div>
            <input
              :class="[
                { 'is-valid': isBrand },
                { 'is-invalid': isBrand === false },
              ]"
              v-model="brand"
              required
              type="text"
              class="form-control"
              placeholder="One Plus"
            />
            <div class="invalid-feedback">
              Brand Name should not contain only Whitespaces
            </div>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea
          v-model="description"
          required
          class="form-control"
          id
          cols="30"
          rows="5"
        ></textarea>
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
          <i class="fal fa-share-square mr-1"></i> Save Product
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
      model: "",
      brand: "",
      price: "",
      description: "",
      file: null,
      fileName: "Choose a File",
    };
  },
  computed: {
    isPrice() {
      if (this.price === "") {
        return null;
      }
      return validator.isNumeric(this.price) && this.price > 0;
    },
    isModel() {
      if (this.model === "") {
        return null;
      }
      if (this.model.length > 0 && this.model.trim().length === 0) {
        return false;
      }
      return true;
    },
    isBrand() {
      if (this.brand === "") {
        return null;
      }
      if (this.brand.length > 0 && this.brand.trim().length === 0) {
        return false;
      }
      return true;
    },
  },
  methods: {
    async handleSubmit() {
      const product = {
        info: {
          model: validator.ltrim(this.model),
          brand: validator.ltrim(this.brand),
          description: validator.ltrim(this.description),
          price: parseFloat(parseFloat(this.price).toFixed(2)),
        },
        file: this.file,
      };
      await this.$store.dispatch("addAdminProducts", product);
      this.resetForm();
    },
    resetForm() {
      this.model = "";
      this.brand = "";
      this.price = "";
      this.description = "";
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
</style>