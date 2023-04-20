<template>
  <v-breadcrumbs class="breadcrumb">
    <v-row class="d-flex justify-center align-center">
      <v-col cols="7">
        <router-link
          class="text-decoration-none"
          :to="{
            name: 'addproduct',
          }"
        >
          <BtnLg title="منتج جديد" icon="mdi-plus" /> </router-link
      ></v-col>
      <v-col align="end" cols="5"> <h1 class="">المنتجات</h1></v-col>
    </v-row>
  </v-breadcrumbs>
  <div class="container">
    <v-row class="d-flex flex-row-reverse">
      <v-col v-if="allproducts.length == 0" cols="12">
        <h3 class="text-center">لايوجد أي منتج</h3></v-col
      >
      <v-col
        v-for="(product, index) in allproducts"
        :key="product.id"
        :cols="$vuetify.display.mdAndUp ? '4' : '12'"
      >
        <v-card class="mx-auto" max-width="344">
          <span v-if="product.quantity == '0'" class="sold-out-badge"><h2>إنتهت</h2></span>
          <v-img
            :src="
              product.image == null || product.image == ''
                ? src1
                : product.image
            "
            class="mt-2"
            height="150px"
          ></v-img>

          <v-card-title class="text-right"
            ><h3>{{ product.productname }}</h3>
          </v-card-title>

          <v-card-subtitle class="text-right"
            ><h3>السعر: {{ product.price }} د.م</h3></v-card-subtitle
          >

          <v-card-subtitle class="text-right mt-2"
            ><h3>الكمية: {{ product.quantity }} د.م</h3></v-card-subtitle
          >

          <v-card-actions class="d-flex justify-center">
            <v-col cols="12">
              <router-link
                class="text-decoration-none"
                :to="{
                  name: 'editproduct',
                  params: { productId: product.id },
                }"
              >
                <v-btn
                  block
                  color="teal-lighten-1"
                  size="large"
                  type="submit"
                  variant="elevated"
                  class="text-h5"
                >
                  <h5 class="mt-2">
                    تعديل المنتج
                    <v-icon class="ml-2 mb-2">mdi-pencil-outline</v-icon>
                  </h5>
                </v-btn>
              </router-link>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { useDisplay } from "vuetify";

import imagevoid from "../assets/void.png";

import BtnXlg from "@/components/BtnXlg";
import BtnLg from "@/components/BtnLg";
import FilterCategories from "@/components/FilterCategories";
import CategorieFilter from "@/components/CategorieFilter";

export default {
  setup() {
    const { display } = useDisplay();
  },

  components: {
    BtnXlg,
    BtnLg,
    FilterCategories,
    CategorieFilter,
  },

  data() {
    return {
      storeId: "",
      src1: imagevoid,
      dialogid: 0,
      dialogname: "",
    };
  },

  computed: {
    ...mapGetters(["allproducts", "getStoreId"]),
  },

  methods: {
    ...mapActions(["fetchProducts", "deleteProduct"]),
  },

  created() {
    this.storeId = this.getStoreId;
    this.fetchProducts(this.storeId);
  },
};
</script>
<style scoped>
.title-lg {
  width: 380px;
}
.title-sm {
  width: 160px;
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
