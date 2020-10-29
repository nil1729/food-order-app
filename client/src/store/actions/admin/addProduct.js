import axios from "axios";
import createConfig from '../../helpers/api-auth';
import path from "path";
import firebase from "@/firebase";
import crypto from "crypto";


export default {
    async addAdminProducts(context, product) {
      try {
        context.commit("SET_PRODUCT_UPLOADING", true);
        const photoURL = await context.dispatch(
          "fileUploadToStorage",
          product.file
        );
        const dbProduct = {
          ...product.info,
          photoURL,
        };
        const res = await axios.post(
          "/api/v1/admin/add-product",
          dbProduct,
          createConfig()
        );
        context.commit("ADD_PRODUCT_IN_LIST", dbProduct);
        context.commit("SET_PRODUCT_UPLOADING", false);
        context.commit("SET_ERRORS", res.data);
      } catch (e) {
        console.log(e);
      }
    },


    async fileUploadToStorage(context, file) {
      try {
        const storage = firebase.storage();
        const extName = path.extname(file.name);
        const fileOnlyName = crypto
          .randomBytes(15)
          .toString("hex")
          .toUpperCase();
        const storageRef = storage.ref(`uploads/${fileOnlyName}${extName}`);
        const metadata = {
          contentType: `${file.type}`,
        };
        await storageRef.put(file, metadata);
        const downloadURL = await storageRef.getDownloadURL();
        return downloadURL;
      } catch (e) {
        console.log(e);
      }
    },

}