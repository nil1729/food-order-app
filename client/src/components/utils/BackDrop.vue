<template>
  <div v-if="loading" class="container d-flex justify-content-center align-items-center">
    <div class="modal-box text-center">
      <h5 class="font-weight-normal">Product Details is Uploading ...</h5>
      <img class="my-3" src="@/assets/backdrop.gif" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "File-Upload-Loader",
  computed: {
    loading() {
      return this.$store.state.productUploading;
    },
  },
};
</script>

<style scoped>
.container {
  max-width: none;
  width: 100%;
  height: 100%;
  background-color: rgba(97, 95, 95, 0.5);
  position: fixed;
  z-index: 98;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-box {
  background-color: white;
  padding: 1rem;
  width: 20rem;
  height: 12rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}
</style>