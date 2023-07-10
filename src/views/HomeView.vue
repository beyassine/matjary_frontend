<template>
    <v-app-bar class=" border mb-5" elevation="0">
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
                <v-img aspect-ratio="16/9" width="140" :src="logo"></v-img>
            </router-link>

        </template>
    </v-app-bar>
    <div class="hero mt-5">
        <v-card elevation="0">
            <v-row class="d-flex justify-center align-center flex-row-reverse" style="padding-bottom: 50px;">
                <v-col class="text-center" cols="12" md="6">
                    <div class=" text-h4  text-right  font-weight-black mb-5"> <v-icon class="text-green">mdi-whatsapp</v-icon> أنشئ
                        متجرك
                        المرتبط بالواتساب</div>
                    <div class="text-h5 text-right mt-3 mb-5">
                        يمكنك الآن إستلام و تأكيد طلباتك عبر الواتساب بكل سهولة
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
                <v-col>
                    <v-img height="400" :src="hero_gif"></v-img>
                </v-col>
            </v-row>
        </v-card>
        <v-row class="d-flex justify-center align-center" style="padding-top: 50px;padding-bottom: 50px;">
            <v-col class="text-right" cols="12" md="6">
                <div class=" text-h4 font-weight-black mb-5">جميع طلباتك منظمة </div>
                <div class="text-h5 mt-3 mb-5">
                    لاحاجة للبحث في رسائل الواتساب على طلباتك بعد الآن، كل طلباتك منظمة و يمكن تأكيدها بزر واحد
                </div>
            </v-col>
            <v-col>
                <v-img height="400" :src="orders_gif"></v-img>
            </v-col>
        </v-row>
        <v-row class="d-flex justify-center align-center flex-row-reverse" style="padding-top: 50px;padding-bottom: 50px;">
            <v-col class="text-right" cols="12" md="6">
                <div class=" text-h4 font-weight-black mb-5">جميع طلباتك منظمة </div>
                <div class="text-h5 mt-3 mb-5">
                    لاحاجة للبحث في رسائل الواتساب على طلباتك بعد الآن، كل طلباتك منظمة و يمكن تأكيدها بزر واحد
                </div>
            </v-col>
            <v-col>
                <v-img height="400" :src="orders_gif"></v-img>
            </v-col>
        </v-row>
    </div>
</template>
  
<script>
import logo from "../assets/matjary_logo_g.png";
import { useDisplay } from "vuetify";

import hero_gif from "../assets/gifs/hero.gif";
import orders_gif from "../assets/gifs/orders.gif";

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
            hero_gif: hero_gif,
            orders_gif: orders_gif,
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
    padding-left: 50px;
    padding-right: 50px;
}

.text-h3 {
    line-height: 5rem;
    font-family: $body-font-family !important;
}

.text-h4 {
    line-height: 3rem;
    letter-spacing: 0.03rem !important;
    font-family: $body-font-family !important;
}

.text-h5 {
    font-family: $body-font-family !important;
}

.text-h6 {
    font-family: $body-font-family !important;
}

.text-subtitle-1 {
    font-family: $body-font-family !important;
}

.header-btn {
    background-image: linear-gradient(to top right, rgb(68, 199, 116), rgb(68, 199, 116));
}
</style>