<template>
    <v-app-bar class="d-flex justify-end" elevation="0">
        <template v-slot:append>
            <v-img aspect-ratio="16/9" width="180" :src="logo"></v-img>
        </template>
        <template v-slot:prepend>
            <router-link class="text-decoration-none" to="login">
                <v-btn class="header-btn" rounded="pill" size="large" variant="elevated">
                    <div class="text-h6 text-white font-weight-black ">
                        دخول
                        <v-icon class="ml-2 ">mdi-lock</v-icon>
                    </div>
                </v-btn>
            </router-link>
        </template>
    </v-app-bar>
    <v-card class="hero">
        <v-row class="d-flex justify-center">
            <v-col class="text-center" cols="12" md="6">
                <div class=" text-h3 font-weight-black mb-5">طور تجارتك الآن </div>
                <div class="text-h5 mt-3 mb-5">
                    يمكنك تصفح و بيع مجموعة واسعة من المنتجات دون القلق بشأن المخزون أو الشحن
                </div>
                <router-link class="text-decoration-none" to="signup">
                    <v-btn rounded="pill" color="white" size="x-large" variant="elevated" class="mt-5">
                        <div class="text-h5 text-green-darken-3 font-weight-black ">
                            أنشئ حسابك
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

export default {
    setup() {
        const { display } = useDisplay();
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
    font-family: $body-font-family !important;
}

.text-h5 {
    font-family: $body-font-family !important;
}

.text-h6 {
    font-family: $body-font-family !important;
}

.header-btn {
    background-image: linear-gradient(to top right, rgb(68, 199, 116), rgb(68, 199, 116));
}
</style>