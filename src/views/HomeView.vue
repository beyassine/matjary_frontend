<template>
    <ExtendHeader bordered="true" />
    <div class="homecontainer">
        <v-row class="d-flex flex-row-reverse">
            <v-col v-for="(product, index) in allproducts" :key="product.id" :cols="$vuetify.display.smAndUp ? '4' : '12'">
                <v-card class="mx-auto " :to="{
                    name: 'productdetail',
                    params: { productId: product.id },
                }">
                    <v-row align="center" class="spacer mt-2 mb-2" no-gutters>
                        <v-col cols="10">
                            <h4 class="mr-2 text-medium-emphasis text-right">{{ product.publisher }}</h4>
                        </v-col>
                        <v-col cols="2">
                            <v-avatar size="40">
                                <v-img :src="product.publisher_logo == null || product.publisher_logo == ''
                                    ? src1
                                    : product.publisher_logo
                                    "></v-img>
                            </v-avatar>
                        </v-col>
                    </v-row>
                    <div class="d-flex justify-end ">
                        <div>
                            <v-card-text class="text-right">
                                <h3>{{ product.productname }}</h3>
                            </v-card-text>
                            <p class="text-right">
                                <span class="text-decoration-line-through text-h6 text-grey">{{ product.unitprice }} DH</span> <span
                                    class="text-h5 text-green ml-2"> {{ product.groupprice }} DH</span>
                            </p>
                            <p class="text-right text-black mt-1" v-if="product.freeshipping">
                                شحن مجاني  <v-icon class="ml-2" icon="mdi-truck-outline" ></v-icon>
                            </p>
                        </div>
                        <v-avatar class="ma-3" size="100" rounded="0">
                            <v-img :src="product.images == null || product.image == ''
                                ? src1
                                : product.images[0]
                                " class="mt-2" height="100px"></v-img>
                        </v-avatar>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
  
<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
import { useDisplay } from "vuetify";
import Cookies from "js-cookie";

import imagevoid from "../assets/void.png";
import storevoid from "../assets/void_store.png";


import ExtendHeader from "../components/ExtendHeader";

export default {
    setup() {
        const { display } = useDisplay();
    },

    components: {
        ExtendHeader
    },

    data() {
        return {
            src1: imagevoid,
            src2: storevoid,
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
            .get(`/product/getall`)
            .then((response) => {
                this.allproducts = response.data;
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