<template>
  <div>
    <div class="container mt-3">
      <div class="row">
        <div class="col-md-4 dp-col">
          <div class="image m-auto">
            <img
              @click="
                if (!show) {
                  modalOpen = true;
                }
              "
              class="img-fluid"
              :class="{ 'low-opacity': !show }"
              :src="user && user.photoURL"
              :alt="user && user.displayName"
            />
            <div @click="modalOpen = true" v-if="!show" class="update-dp">
              <strong><i class="fad fa-camera-retro"></i></strong>
              <br />
              Change Profile Photo
            </div>
          </div>
        </div>
        <div class="col-md-8 bg-light p-4">
          <table class="table">
            <tbody>
              <tr>
                <th scope="row">Display Name</th>
                <td v-if="show">{{ user && user.displayName }}</td>
                <td v-else>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      :placeholder="user && user.displayName"
                      v-model="displayName"
                      :class="[
                        {
                          'is-valid': validName === true,
                          'is-invalid': validName === false,
                        },
                      ]"
                      @keyup="checkName"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">Phone Number</th>
                <td v-if="show" class="text-danger">
                  {{ user && user.phoneNumber ? user.phoneNumber : "Null" }}
                </td>
                <td v-else>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      v-model="phoneNumber"
                      :class="[
                        {
                          'is-valid': validPhone === true,
                          'is-invalid': validPhone === false,
                        },
                      ]"
                      @keyup="checkPhone"
                      :placeholder="
                        user && user.phoneNumber ? user.phoneNumber : 'Null'
                      "
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">Email Address</th>
                <td>{{ user && user.email }}</td>
              </tr>
              <tr>
                <th scope="row">Sign in Method</th>
                <td class="text-capitalize">
                  {{ user && user.providerId.split(".")[0] }}
                </td>
              </tr>
              <tr>
                <th scope="row">Static User ID</th>
                <td>{{ user && user.id }}</td>
              </tr>
            </tbody>
          </table>
          <div class="row">
            <router-link
              v-if="show"
              to="/profile/settings"
              class="btn-sm btn-primary m-auto"
            >
              <i class="fal fa-user-edit"></i>{{ "  " }}Edit Profile
            </router-link>
            <button
              @click="handleSubmit"
              :disabled="loading"
              v-else
              type="submit"
              class="btn-sm btn-warning m-auto"
            >
              <i v-if="!loading" class="fad fa-user-edit"></i
              >{{ loading ? " Loading ..." : " Update Changes" }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <app-dp-modal @modalclose="modalOpen = false" v-if="modalOpen && !show" />
  </div>
</template>

<script>
import validator from "validator";
import { mapGetters } from "vuex";
import DpModal from "../utils/DP_Modal";
export default {
  name: "Profile-Page",
  components: {
    "app-dp-modal": DpModal,
  },
  computed: {
    ...mapGetters(["user"]),
    show() {
      return this.$route.name === "Profile";
    },
  },
  data() {
    return {
      phoneNumber: this.$store.state.user.phoneNumber,
      displayName: this.$store.state.user.displayName,
      validName: null,
      validPhone: null,
      loading: false,
      modalOpen: false,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        this.loading = true;
        if (this.checkName() && this.checkPhone()) {
          await this.$store.dispatch("userUpdate", {
            phoneNumber: this.phoneNumber,
            displayName: this.displayName,
          });
          this.validName = null;
          this.validPhone = null;
        }
        this.loading = false;
        this.$router.push("/profile");
      } catch (e) {
        console.log(e);
      }
    },
    checkPhone() {
      this.validPhone =
        this.phoneNumber.length >= 10 &&
        validator.isMobilePhone(this.phoneNumber);
      return this.validPhone;
    },
    checkName() {
      let words = this.displayName.split(" ");
      this.validName = true;
      words.forEach((word) => {
        if (word.trim().length === 0 || !validator.isAlpha(word)) {
          this.validName = false;
        }
      });
      return this.validName;
    },
  },
};
</script>

<style scoped>
.dp-col {
  display: contents;
}
.image {
  height: 12rem;
  width: 12rem;
}
table th {
  font-weight: 500;
}
table th,
table td {
  vertical-align: middle;
  border-top: none;
  border-bottom: 1px solid #dee2e6;
}
.image {
  position: relative;
}
img {
  border-radius: 50%;
  position: relative;
  height: 100%;
}
img.low-opacity {
  opacity: 0.35;
  cursor: pointer;
}
input {
  box-shadow: none !important;
}
button,
a {
  outline: none !important;
  border: none !important;
  box-shadow: none !important;
  text-decoration: none !important;
  font-size: 14px;
  letter-spacing: 0.5px;
  font-weight: 400;
}
.update-dp {
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  font-size: 22px;
  line-height: 25px;
  cursor: pointer;
}
</style>