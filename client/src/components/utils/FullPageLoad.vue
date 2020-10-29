<template>
  <div class="modal fade show" role="dialog">
    <div class="loader-div m-auto">
      <img class="img-fluid m-auto" src="@/assets/checkout.gif" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Loader-Checkout",
};
</script>

<style scoped>
.modal.fade.show {
  display: block;
  background-color: rgba(44, 40, 40, 0.575);
}
.loader-div {
  height: 100%;
  display: flex;
}
</style>
