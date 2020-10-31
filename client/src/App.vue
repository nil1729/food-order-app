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

/* total width */
::-webkit-scrollbar {
  background-color: #fff;
  width: 16px;
}
/* background of the scrollbar except button or resizer */
::-webkit-scrollbar-track {
  background-color: #fff;
}
::-webkit-scrollbar-track:hover {
  background-color: #f4f4f4;
}
/* scrollbar itself */
::-webkit-scrollbar-thumb {
  background-color: #babac0;
  border-radius: 16px;
  border: 5px solid #fff;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #a0a0a5;
  border: 4px solid #f4f4f4;
}
/* set button(top and bottom of the scrollbar) */
::-webkit-scrollbar-button {
  display: none;
}

body {
  overflow-x: hidden;
}

</style>