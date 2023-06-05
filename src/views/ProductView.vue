<template>
  <v-toolbar class="breadcrumb">
    <v-row class="container d-flex justify-center align-center">
      <v-col cols="7">
        <router-link class="text-decoration-none text-grey-darken-3" :to="{
          name: 'cart',
        }">
          <v-badge v-if="iscart" color="error" dot>
            <v-icon class="ms-5" size="x-large">mdi-shopping-outline</v-icon>
          </v-badge>
          <v-icon v-if="!iscart" class="ms-5" size="x-large">mdi-shopping-outline</v-icon>
        </router-link>
      </v-col>
      <v-col align="end" cols="5">
        <h1 class="">المنتجات</h1>
      </v-col>
    </v-row>
  </v-toolbar>
  <div class="container">
    <v-row class="d-flex flex-row-reverse">
      <v-col v-if="allproducts.length == 0" cols="12">
        <h3 class="text-center">قائمة المنتجات</h3>
      </v-col>
      <v-col v-for="(product, index) in allproducts" :key="product.id" :cols="$vuetify.display.smAndUp ? '4' : '12'">
        <v-card class="mx-auto" max-width="344">
          <span v-if="product.quantity == '0'" class="sold-out-badge">
            <h2>إنتهت</h2>
          </span>
          <v-img :src="product.image == null || product.image == ''
              ? src1
              : product.image
            " class="mt-2" height="150px"></v-img>

          <v-card-title class="text-right">
            <h3>{{ product.productname }}</h3>
          </v-card-title>

          <v-card-subtitle class="text-right">
            <h3>السعر: {{ product.price }} د.م</h3>
          </v-card-subtitle>
          <v-card-actions>
            <v-btn block color="teal-lighten-1" size="large" type="submit" variant="elevated" class="text-h5 mt-3" @click="opendialog(
                product.id,
                product.productname,
                product.price,
                product.image
              )
              " :disabled="product.quantity == '0'">
              <h5 class="mt-2">
                أضف إلى السلة
                <v-icon class="ml-2 mb-2">mdi-shopping-outline</v-icon>
              </h5>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
  <v-dialog class="d-flex flex-row-reverse text-right" max-width="600" v-model="dialog">
    <v-card>
      <v-card-title>
        <h3>{{ dialogname }}</h3>
      </v-card-title>
      <v-card-item>
        <h2 class="mb-3">الكمية</h2>
        <v-text-field append-inner-icon="mdi-layers-triple" variant="outlined" type="number" reverse
          v-model="dialogquantity" :readonly="loading" :rules="required" compact></v-text-field>
      </v-card-item>
      <v-card-item>
        <h2 class="mb-3">ثمن البيع</h2>
        <v-text-field append-inner-icon="mdi-tag" variant="outlined" type="number" reverse v-model="dialogprice"
          :readonly="loading" :rules="validateprice" compact></v-text-field>
      </v-card-item>
      <v-card-actions><v-btn block color="teal-lighten-1" size="large" type="submit" variant="elevated"
          class="text-h5 mt-1" @click="addtocart()">
          <h5 class="">تأكيد</h5>
        </v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn block size="large" class="text-h5 mt-1" @click="dialog = false">
          <h5 class="">تراجع</h5>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axiosInstance from "../axios/axiosInstance";
import { mapGetters, mapActions } from "vuex";
import { useDisplay } from "vuetify";
import Cookies from "js-cookie";

import imagevoid from "../assets/void.png";
import storevoid from "../assets/void_store.png";


export default {
  setup() {
    const { display } = useDisplay();
  },

  components: {
  },

  data() {
    return {
      src1: imagevoid,
      src2: storevoid,
      logo: "",
      dialogid: 0,
      dialogname: "",
      allproducts: "",
      //dialog
      dialogid: "",
      dialogname: "",
      dialogimg: "",
      dialog: false,
      //form
      dialoid: "",
      dialogquantity: 1,
      dialogprice: "",
      price: "",
      loading: false,
      required: [(v) => !!v || "لا يجوز أن يُترَك هذا الحقل فارغًا"],
      validateprice: [
        (v) => !!v || "لا يجوز أن يُترَك هذا الحقل فارغًا",
        (v) =>
          parseFloat(v) >= parseFloat(this.price) ||
          "سعر بيع المنتج يجب أن يكون أكبر من أو يساوي السعر الأصلي",
      ],
      // cart
    };
  },

  computed: {
    ...mapGetters(["iscart", "getUserRole"]),
  },

  methods: {
    ...mapActions(["setiscart"]),
    opendialog(id, name, price, img) {
      this.dialogid = id;
      this.dialogname = name;
      this.dialog = true;
      this.dialogprice = price;
      this.dialogquantity = 1;
      this.price = price;
      this.dialogimg = img;
    },
    addtocart() {
      var cart = JSON.parse(Cookies.get("cart"));
      if (cart[this.dialogid] == undefined) {
        cart[this.dialogid] = {
          id: this.dialogid,
          name: this.dialogname,
          price: this.dialogprice,
          originalprice: this.price,
          quantity: this.dialogquantity,
          img: this.dialogimg,
          total_product:
            parseFloat(this.dialogprice) * parseFloat(this.dialogquantity),
        };
        Cookies.set("cart", JSON.stringify(cart));
        this.setiscart();
        this.dialog = false;
      } else {
        cart[this.dialogid].quantity = this.dialogquantity;
        cart[this.dialogid].price = this.dialogprice;
        cart[this.dialogid].total_product =
          parseFloat(this.dialogprice) * parseFloat(this.dialogquantity);
        Cookies.set("cart", JSON.stringify(cart));
        this.dialog = false;
      }
    },
  },

  created() {
    axiosInstance
      .get(`/product/getall`)
      .then((response) => {
        this.allproducts = response.data;
        this.logo = response.data.logo;
      })
      .catch((err) => { });
  },
};
</script>
<style scoped>
.title-lg {
  width: 320px;
}

.title-sm {
  width: 220px;
}

.sold-out-badge {
  background-color: red;
  color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  position: absolute;
  margin: 0.1rem;
  top: 0;
  right: 0;
}
</style>