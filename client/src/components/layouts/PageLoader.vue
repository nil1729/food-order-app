<template>
  <div class="container d-flex justify-content-center align-items-center">
    <img src="@/assets/loader.gif" alt="Loader" />
  </div>
</template>

<script>
export default {
  name: "App-Page-Loader",
};
</script>

<style scoped>
.container {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 400;
  background-color: white;
  max-width: none;
}
</style>
