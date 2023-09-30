<template>
  <v-breadcrumbs class="breadcrumb">
    <v-row v-if="this.lang=='ar'" class="d-flex justify-center align-center">
      <v-col cols="7">
        <router-link class="text-decoration-none" :to="{
          name: 'adminaddproducts',
        }">
          <BtnLg title="أضف منتج" icon="mdi-plus" />
        </router-link></v-col>
      <v-col align="end" cols="5">
        <h2 class="">المنتجات</h2>
      </v-col>
    </v-row>
    <v-row v-if="this.lang=='fr'" class="d-flex justify-center align-center">
      <v-col  cols="5">
        <h2 class="">Produits</h2>
      </v-col>
      <v-col align="end" cols="7">
        <router-link class="text-decoration-none" :to="{
          name: 'adminaddproducts',
        }">
          <BtnLg title="Ajouter" icon="mdi-plus" />
        </router-link></v-col>
    </v-row>
  </v-breadcrumbs>
  <div class="container">
    <v-row class="d-flex flex-row-reverse">
      <v-col v-if="allproducts.length == 0" cols="12">
        <h3 class="text-center">لايوجد أي منتج</h3>
      </v-col>
      <v-col v-for="(product, index) in allproducts" :key="product.id" :cols="$vuetify.display.mdAndUp ? '3' : '6'">

        <v-card class="mx-auto" max-width="344">
          <v-img class="mt-2 mb-2" :src="product.images == null || product.image == ''
            ? src1
            : product.images[0]" height="150px"></v-img>

          <v-card-title class="text-right">
            <h4>{{ product.productname }}</h4>
          </v-card-title>

          <v-card-title class="text-right">
            <h3>{{ product.unitprice }} {{ $t('currency.DH') }}</h3>
          </v-card-title>
          <router-link class="text-decoration-none" :to="{
            name: 'admineditproducts',
            params: { productId: product.id },
          }">
            <v-card-actions>
              <v-btn block color="blue-grey" size="large" type="submit" variant="elevated" class="text-h6">
                {{ $t('adminproduct.edit') }}
                <v-icon class="ml-3">mdi-pencil-outline</v-icon>
              </v-btn>
            </v-card-actions>
          </router-link>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
  
<script>
import { useI18n } from 'vue-i18n'
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
      lang:"",
      src1: imagevoid,
      dialogid: 0,
      dialogname: "",
    };
  },

  computed: {
    ...mapGetters(["allproducts", "getStoreId","getstoreLang"]),
  },

  methods: {
    ...mapActions(["fetchProducts", "deleteProduct"]),
  },

  created() {
    const t = useI18n()
    this.storeId = this.getStoreId;
    this.lang = this.getstoreLang;
    this.fetchProducts(this.storeId);
    t.locale.value = this.lang
    return { t }
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
  