<template>
  <div class="modal fade show" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <form @submit.prevent="handleSubmit">
          <div class="modal-header">
            <h5 class="modal-title text-center m-auto">Upload Profile Photo</h5>
            <button
              :disabled="loading"
              type="button"
              @click="$emit('modalclose')"
              class="close float-right"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">Upload</span>
              </div>
              <div class="custom-file">
                <input
                  type="file"
                  class="custom-file-input"
                  @change="setFile"
                  :name="file"
                  required
                />
                <label class="custom-file-label">{{ fileName }}</label>
              </div>
            </div>
          </div>
          <div class="modal-footer mt-1">
            <button
              @click="$emit('modalclose')"
              type="button"
              class="btn-sm btn-secondary"
              data-dismiss="modal"
              :disabled="loading"
            >
              Close
            </button>
            <button
              :disabled="loading"
              type="submit"
              class="btn-sm btn-primary"
            >
              {{ loading ? "Loading ..." : "Save changes" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dp-Modal",
  data() {
    return {
      file: null,
      fileName: "Choose a File",
      loading: false,
    };
  },
  methods: {
    setFile(e) {
      const fileType = new RegExp("image", "i");
      const newFile = e.target.files[0];
      if (!fileType.test(newFile.type)) {
        // e.target.form.reset();
        this.resetForm();
        return this.$store.commit("SET_ERRORS", {
          code: "Validation Error",
          message: "The File you are choosing is not an Image",
        });
      }
      this.file = newFile;
      this.fileName = newFile.name;
    },
    resetForm: function () {
      this.file = null;
      this.fileName = "Choose a File";
    },
    async handleSubmit() {
      try {
        this.loading = true;
        await this.$store.dispatch("updateDP", this.file);
        this.resetForm();
        this.loading = false;
        this.$emit("modalclose");
        this.$router.push("/profile");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.modal.fade.show {
  display: block;
  background-color: rgba(44, 40, 40, 0.575);
}
.modal-content {
  border: none !important;
}
.modal-title {
  font-size: 21px;
  font-weight: 400;
  letter-spacing: 0.3px;
  color: blueviolet;
}

.modal-header .close {
  padding: 0;
  margin: 0;
}

.modal-header,
.modal-footer {
  border: none !important;
}

.custom-file-input:focus ~ .custom-file-label {
  box-shadow: 0 0 0 0.1rem rgba(39, 128, 227, 0.25);
}

button {
  outline: none !important;
  border: none !important;
  box-shadow: none !important;
}
.btn-sm {
  font-size: 14px;
  letter-spacing: 0.5px;
  font-weight: 400;
}
</style>