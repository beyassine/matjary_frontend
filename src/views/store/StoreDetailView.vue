<template>
    <ExtendHeader bordered="true" />
    <div class="homecontainer">
        <div class="d-flex justify-center mt-2 mb-2">
                <v-img height="150" :src="logo == null || logo == ''
                    ? src2
                    : logo
                    "></v-img>
        </div>
        <div class="d-flex justify-center mb-5">
            <h2 class="text-right">{{ storename }}</h2>
        </div>
        <v-divider class="mb-5"></v-divider>
        <v-row class="d-flex flex-row-reverse mt-2">
            <v-col v-if="allproducts.length == 0" cols="12">
                <h3 class="text-center">لايوجد أي منتج</h3>
            </v-col>
            <v-col v-for="(product, index) in allproducts" :key="product.id" :cols="$vuetify.display.smAndUp ? '4' : '12'">
                <v-card class="mx-auto" max-width="344" style="padding: 10px;">
                    <v-img class="mt-2 mb-2" :src="product.images == null || product.image == ''
                        ? src1
                        : product.images[0]" height="200px"></v-img>

                    <v-card-title class="text-right">
                        <h4>{{ product.productname }}</h4>
                    </v-card-title>

                    <v-card-title class="text-right">
                        <h3> د.م <span>{{ product.unitprice }}</span></h3>
                    </v-card-title><router-link class="text-decoration-none" :to="{
                        name: 'productdetail',
                        params: { productId: product.id },
                    }">
                        <v-card-actions>
                            <v-btn block color="green-lighten-1" size="large" variant="elevated"
                                class="text-h5 text-white mt-3">
                                إشتري الأن
                                <v-icon class="ml-3">mdi-shopping-outline</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </router-link>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
  
<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
import { useDisplay } from "vuetify";

import imagevoid from "../../assets/void.png";
import storevoid from "../../assets/void_store.png";


import ExtendHeader from "../../components/ExtendHeader";

export default {
    setup() {
        const { display } = useDisplay();
    },

    components: {
        ExtendHeader
    },

    data() {
        return {
            storeId: this.$route.params.storeId,
            src1: imagevoid,
            src2: storevoid,
            storename: '',
            logo: '',
            allproducts: '',
        };
    },

    computed: {
        ...mapGetters(["iscart", "getUserRole"]),
    },

    methods: {
    },

    created() {
        axios
            .get(`/store/${this.storeId}`)
            .then((response) => {
                this.allproducts = response.data.products
                this.storename = response.data.storename
                this.logo = response.data.logo
            })
            .catch((err) => { });
    },
};
</script>
<style scoped>
.homecontainer {
    margin: auto;
    padding: 20px;
}
</style>