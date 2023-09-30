<template>
    <v-breadcrumbs class="breadcrumb">
        <v-row class="d-flex justify-center align-center">
            <v-col cols="7">
            </v-col>
            <v-col align="end" cols="5">
                <h1 class="">المنتجات</h1>
            </v-col>
        </v-row>
    </v-breadcrumbs>
    <v-container class="container" v-if="products.length !== 0">
        <v-row class="d-flex justify-center ">
            <v-col v-for="(product, index) in products" :key="product.id" :cols="$vuetify.display.mdAndUp ? '4' : '12'">
                <v-card class="mb-1" elevation="1">
                    <div class="d-flex justify-space-between align-center">
                        <div class="d-flex flex-no-wrap align-center justify-end ma-1">
                            <div class="mr-2">
                                <h4 class="text-right">{{ product.productname }}</h4>
                            </div>
                            <div class="d-flex flex-no-wrap justify-center ma-1">
                                <v-avatar class="ma-1" size="80" rounded="0">
                                    <v-img :src="product.images == null || product.images == ''
                                        ? src1
                                        : product.images[0]"></v-img>
                                </v-avatar>
                            </div>
                        </div>
                    </div>
                    <v-row class="d-flex justify-center">
                        <v-col cols="10">
                            <v-text-field append-inner-icon="mdi-tag" type="number" placeholder="" variant="outlined"
                                v-model="product.unitprice"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <v-bottom-navigation style="height: 70px;" elevation="0">
            <v-btn block class=" float text-white " @click="bulkupdate()">
                <h2> تعديل </h2>
            </v-btn>
        </v-bottom-navigation>
    </v-container>
</template>
  
<script>
import { mapGetters } from "vuex";
import axiosInstance from "../../axios/axiosInstance";
import { useDisplay } from "vuetify";
import imagevoid from "../../assets/void-imagep.png";

import BtnLg from "@/components/BtnLg";

export default {
    setup() {
        const { display } = useDisplay();
    },

    components: {
        BtnLg,
    },

    data() {
        return {
            storeId: "",
            catId: this.$route.params.categorieId,
            products: '',
            //image           
            imgvoid: imagevoid,
            image: '',
            img_changes: false,
            img_uploading: false,
        };
    },

    computed: {
        ...mapGetters(["getStoreId"]),
    },

    methods: {
        bulkupdate() {
            axiosInstance.post(`/product/bulkupdate/${this.storeId}`, this.products).then((response) => {
                if (response.status === 200) {
                    this.$router.push({
                        name: "admincategories",
                    })
                }
            });
        },
    },
    created() {
        this.storeId = this.getStoreId;
        axiosInstance
            .get(`/store/getproductsbycat/${this.storeId}/${this.catId}`)
            .then((response) => {
                this.products = response.data
            })
            .catch((err) => { });
    },
};
</script>

<style lang="scss" scoped>
@import "../../scss/variables.scss";

.float {
    position: fixed;
    width: 260px;
    height: 60px;
    bottom: 10px;
    background-color: rgb(0, 155, 57);
    color: #FFF;
    font-size: 50px;
    border-radius: 12px;
    box-shadow: 2px 2px 3px #999;
    font-family: $body-font-family;
}

.active {
    background-color: aqua;
}
</style>
  