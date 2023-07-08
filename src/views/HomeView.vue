<template>
    <v-app-bar class="mb-5" elevation="0">
        <router-link class="text-decoration-none" :to="{
            name: 'login',
        }">
            <v-btn color="white" size="small" variant="elevated" class="ml-2">
                <div class="text-subtitle-1 font-weight-black ">
                    تسجيل الدخول
                    <v-icon class="ml-1 ">mdi-lock-outline</v-icon>
                </div>
            </v-btn>
        </router-link>
        <template v-slot:append>
            <router-link class="text-decoration-none" :to="{
                name: 'home',
            }">
                <v-img aspect-ratio="16/9" width="160" :src="logo"></v-img>
            </router-link>

        </template>
    </v-app-bar>
    <v-card class="hero ">
        <v-row class="d-flex justify-center">
            <v-col class="text-center" cols="12" md="6">
                <div class=" text-h4 font-weight-black mb-5"> <v-icon class="text-green">mdi-whatsapp</v-icon> أنشئ متجرك
                    المرتبط بالواتساب</div>
                <div class="text-h5 mt-3 mb-5">
                    استلم طلباتك عبر الواتساب عن طريق متجرك الإلكتروني
                </div>
                <router-link class="text-decoration-none" to="signup">
                    <v-btn rounded="pill" color="white" size="x-large" variant="elevated" class="mt-5">
                        <div class="text-h5 text-green-darken-3 font-weight-black ">
                            أنشئ متجرك
                            <v-icon class="ml-2 ">mdi-arrow-right-circle</v-icon>
                        </div>
                    </v-btn>
                </router-link>
            </v-col>
        </v-row>
    </v-card>
</template>
  
<script>
import logo from "../assets/matjary_logo_g.png";
import { useDisplay } from "vuetify";

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
            logo: logo,
        };
    },

    methods: {},
    computed: {},
};
</script>
<style lang="scss" scoped>
@import "../scss/variables.scss";

.hero {
    background-image: linear-gradient(to bottom, rgb(255, 255, 255), rgb(155, 243, 201));
    padding: 50px;
    padding-top: 100px;
    height: 100%;
}

.text-h3 {
    line-height: 5rem;
    font-family: $body-font-family !important;
}

.text-h4 {
    line-height: 3rem;    
    letter-spacing: 0.03rem;
    font-family: $body-font-family !important;
}

.text-h5 {
    font-family: $body-font-family !important;
}

.text-subtitle-1 {
    font-family: $body-font-family !important;
}

.header-btn {
    background-image: linear-gradient(to top right, rgb(68, 199, 116), rgb(68, 199, 116));
}
</style>