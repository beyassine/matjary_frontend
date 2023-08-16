<template>
    <v-breadcrumbs class="d-flex justify-center align-center breadcrumb">
        <div></div>
        <div>
            <h2>معلومات التواصل</h2>
        </div>
    </v-breadcrumbs>
    <div class="container">
        <v-form class="bg-white mt-3" v-model="form" @submit.prevent="onSubmit">
            <v-card-item class="">
                <h3 class="mb-3">الهاتف</h3>
                <v-text-field append-inner-icon="mdi-phone-in-talk-outline" placeholder="أدخل الهاتف" variant="outlined" v-model="telephone"></v-text-field>
            </v-card-item>
            <v-card-item class="">
                <h3 class="mb-3">واتساب</h3>
                <v-text-field append-inner-icon="mdi-whatsapp" placeholder="أدخل واتساب" variant="outlined" v-model="whatsapp"></v-text-field>
            </v-card-item>
            <v-card-item class="">
                <h3 class="mb-3">العنوان</h3>
                <v-text-field append-inner-icon="mdi-whatsapp" placeholder="أدخل العنوان" variant="outlined" v-model="maps"></v-text-field>
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
            telephone: '',
            whatsapp: '',
            maps: '',
        };
    },

    computed: {
        ...mapGetters(["getUserId", "getStoreId"]),
    },

    methods: {
        onSubmit() {
            this.loading = true;
            axiosInstance.post(`/store/${this.storeId}/updateinfo?telephone=${this.telephone}&whatsapp=${this.whatsapp}&maps=${this.maps}`).then((response) => {
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
                this.telephone = response.data.telephone
                this.whatsapp = response.data.whatsapp
                this.maps = response.data.maps
            }
        });
    },
};
</script>
    