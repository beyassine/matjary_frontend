<template>
    <v-breadcrumbs class="d-flex justify-center align-center breadcrumb">
        <div></div>
        <div>
            <h2>معلومات الشحن</h2>
        </div>
    </v-breadcrumbs>
    <div class="container">
        <v-form class="bg-white mt-3" v-model="form" @submit.prevent="onSubmit">
            <v-card-item class="d-flex justify-end">
                <v-row>
                    <v-col cols="3">
                        <v-switch color="green" v-model="pickup"></v-switch>
                    </v-col>
                    <v-col cols="9">
                        <h3 class="mt-3">الاستلام من المتجر</h3>
                    </v-col>
                </v-row>
            </v-card-item>
            <v-card-item class="d-flex justify-end">
                <v-row>
                    <v-col cols="3">
                        <v-switch color="green" v-model="shipping"></v-switch>
                    </v-col>
                    <v-col cols="9">
                        <h3 class="mt-3">شحن و توصيل</h3>
                    </v-col>
                </v-row>
            </v-card-item>
            <v-card-item class="d-flex justify-end">
                <v-row>
                    <v-col cols="6">
                        <v-text-field append-inner-icon="mdi-tag" placeholder="0.00" variant="outlined" type="number"
                            v-model="shipcost"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <h3 class="mt-3">ثمن الشحن</h3>
                    </v-col>
                </v-row>
            </v-card-item>
            <v-card-actions>
                <v-btn block color="green-lighten-1" size="large" type="submit" variant="elevated" class="text-h5">
                    تعديل
                </v-btn>
            </v-card-actions>
        </v-form>
    </div>
</template>
<style scoped>
.v-progress-circular {
    margin: 3rem;
}
</style>
<script>
import { mapGetters } from "vuex";

import axiosInstance from "../../axios/axiosInstance";
import { useDisplay } from "vuetify";

export default {
    setup() {
        const { display } = useDisplay();
    },

    data() {
        return {
            storeId: "",
            form: false,
            loading: false,
            pickup: true,
            shipping: true,
            shipcost: '0'
        };
    },

    computed: {
        ...mapGetters(["getUserId", "getStoreId"]),
    },

    methods: {
        onSubmit() {
            this.loading = true;
            axiosInstance.post(`/store/${this.storeId}/updateshipping?pickup=${this.pickup}&shipping=${this.shipping}&shipcost=${this.shipcost}`).then((response) => {
                if (response.status === 200) {
                    this.$router.push({
                        name: "adminsettings",
                    });
                }
            });
        },
    },

    created() {
        this.storeId = this.getStoreId;
        axiosInstance.get(`/store/get/${this.storeId}`).then((response) => {
            if (response.status === 200) {
                this.pickup=response.data.pickup
                this.shipping=response.data.shipping
                this.shipcost=response.data.shipcost
            }
        });
    },
};
</script>
    