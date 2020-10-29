import axios from "axios";
import createConfig from '../helpers/api-auth';
import firebase from "@/firebase";
import path from "path";
import crypto from 'crypto';

export default {
    async userUpdate(context, data) {
      try {
        let res = await axios.post(
          "/api/v1/update-profile-details",
          data,
          createConfig()
        );
        if (res.status === 200) {
          context.commit("SET_USER_UPDATE", data);
          context.commit("SET_ERRORS", {
            code: "Notification",
            message: res.data.msg,
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    async updateDP(context, file) {
      try {
        const storage = firebase.storage();
        const extName = path.extname(file.name);
        const fileOnlyName = crypto
          .randomBytes(15)
          .toString("hex")
          .toUpperCase();
        const storageRef = storage.ref(
          `profiles/${context.state.user.id}/${fileOnlyName}${extName}`
        );
        const metadata = {
          contentType: `${file.type}`,
        };
        await storageRef.put(file, metadata);
        const photoURL = await storageRef.getDownloadURL();
        let res = await axios.post(
          "/api/v1/update-profile-details", {
            photoURL,
          },
          createConfig()
        );
        if (res.status === 200) {
          context.commit("SET_USER_UPDATE", {
            photoURL,
          });
          context.commit("SET_ERRORS", {
            code: "Notification",
            message: res.data.msg,
          });
        }
      } catch (e) {
        console.log(e);
      }
    },


    async fetchUserOrders(context) {
      try {
        if (!context.state.userOrders) {
          const res = await axios.get("/api/v1/user/orders", createConfig());
          if (res.data.orders) {
            context.commit("SET_USER_ORDERS", res.data.orders);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
}