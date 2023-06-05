<template>
    <ExtendHeader bordered="true" />
    <div class="homecontainer">
        <v-row class="d-flex flex-row-reverse">
            <v-col v-for="(product, index) in allproducts" :key="product.id" :cols="$vuetify.display.smAndUp ? '4' : '12'">
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