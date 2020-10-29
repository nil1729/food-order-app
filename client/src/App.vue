<template>
  <div>
    <app-alert v-if="error" />
    <app-page-loader v-if="loading" />
    <router-view v-else />
  </div>
</template>

<script>
import Alert from "./components/utils/Alerts";
import PageLoader from "./components/layouts/PageLoader";
export default {
  name: "App-Phone-Store",
  computed: {
    loading() {
      return this.$store.state.pageLoading;
    },
    error() {
      return this.$store.state.errors;
    },
  },
  watch: {
    "$store.state.user": function () {
      if (!this.$store.state.user) {
        this.$router.push("/login");
      }
    },
  },
  components: {
    "app-alert": Alert,
    "app-page-loader": PageLoader,
  },
};
</script>

<style>
::-webkit-scrollbar {
  width: 0;
}
body {
  overflow-x: hidden;
}
</style>