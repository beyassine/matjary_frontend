<template>
  <v-breadcrumbs class="breadcrumb">
    <v-row class="d-flex justify-center align-center">
      <v-col cols="7">
        <router-link class="text-decoration-none" :to="{
          name: 'supplieraddproducts',
        }">
          <BtnLg title="أضف منتج" icon="mdi-plus" />
        </router-link></v-col>
      <v-col align="end" cols="5">
        <h1 class="">المنتجات</h1>
      </v-col>
    </v-row>
  </v-breadcrumbs>
  <div class="container">
    <v-row class="d-flex flex-row-reverse">
      <v-col v-if="allproducts.length == 0" cols="12">
        <h3 class="text-center">لايوجد أي منتج</h3>
      </v-col>
      <v-col v-for="(product, index) in allproducts" :key="product.id" :cols="$vuetify.display.mdAndUp ? '4' : '12'">
        <v-card class="mx-auto " :to="{
                name: 'productdetail',
                params: { productId: product.id },
              }">
          <div class="d-flex flex-no-wrap justify-space-between">

            <v-avatar class="ma-3" size="125" rounded="0">
              <v-img :src="product.images == null || product.image == ''
                ? src1
                : product.images[0]
                " class="mt-2" height="150px"></v-img>
            </v-avatar>
            <div>
              <v-card-text class="">
                <h3>{{ product.productname }}</h3>
              </v-card-text>

              <v-card-title class="text-h5 text-red">
                {{ product.groupprice }} DH
              </v-card-title>

              
              <v-card-subtitle>إبتداء من {{ product.groupquantity }} منتجات</v-card-subtitle>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex";
import { useDisplay } from "vuetify";

import imagevoid from "../../assets/void.png";

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
  