<template>
    <v-app-bar class=" border mb-5" elevation="0">
        <router-link class="text-decoration-none" :to="{
            name: 'login',
        }">
            <v-btn color="white" size="small" variant="elevated" class="ml-2">
                <div class="text-subtitle-1 font-weight-black ">
                    الدخول
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
    <div class="hero">
        <v-card elevation="0">
            <v-row class="d-flex justify-center align-center flex-row-reverse"
                style="padding-top: 50px;padding-bottom: 50px;">
                <v-col class="text-center" cols="12" md="6">
                    <div class=" text-h4 font-weight-black mb-5"> <v-icon class="text-green">mdi-whatsapp</v-icon> أنشئ
                        متجرك
                        المرتبط بالواتساب</div>
                    <div class="text-h5 mt-3 mb-5">
                        يمكنك الآن إستلام و تأكيد طلباتك عبر الواتساب بكل سهولة
                    </div>
                    <router-link class="text-decoration-none" to="signup">
                        <v-btn rounded="pill" color="green-darken-3 " size="x-large" variant="elevated" class="mt-5">
                            <div class="text-h5 text-white font-weight-black ">
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
                    لاحاجة للبحث في رسائل الواتساب على طلباتك بعد الآن، كل طلباتك منظمة في مكان واحد
                </div>
                <router-link class="text-decoration-none" to="signup">
                    <v-btn rounded="pill" color="green-darken-3 " size="large" variant="elevated" class="mt-5">
                        <div class="text-h5 text-white font-weight-black ">
                            أنشئ متجرك
                            <v-icon class="ml-2 ">mdi-arrow-right-circle</v-icon>
                        </div>
                    </v-btn>
                </router-link>
            </v-col>
            <v-col>
                <v-img height="400" :src="orders_gif"></v-img>
            </v-col>
        </v-row>
        <v-row class="d-flex justify-center align-center flex-row-reverse" style="padding-top: 50px;padding-bottom: 50px;">
            <v-col class="text-right" cols="12" md="6">
                <div class=" text-h4 font-weight-black mb-5"> متجرك الإلكتروني جاهز في دقائق</div>
                <v-list-item append-icon="mdi-check" class=" text-right mt-3">
                    <span class="text-h5">
                        أنشئ حسابك عبر استمارة التسجيل
                    </span>
                </v-list-item>
                <v-list-item append-icon="mdi-check" class=" text-right mt-3">
                    <span class="text-h5">
                        أضف المعلومات الخاصة بمتجرك
                    </span>
                </v-list-item>
                <v-list-item append-icon="mdi-check" class=" text-right mt-3">
                    <span class="text-h5">
                        أضف منتجاتك
                    </span>
                </v-list-item>
                <router-link class="text-decoration-none" to="signup">
                    <v-btn rounded="pill" color="green-darken-3 " size="large" variant="elevated" class="mt-5">
                        <div class="text-h5 text-white font-weight-black ">
                            أنشئ متجرك
                            <v-icon class="ml-2 ">mdi-arrow-right-circle</v-icon>
                        </div>
                    </v-btn>
                </router-link>
            </v-col>
            <v-col>
                <v-img height="400" :src="products_gif"></v-img>
            </v-col>
        </v-row>
        <div class=" text-center text-h4 font-weight-black mt-5 mb-5">باقات الإشتراك</div>
        <v-row class="d-flex justify-center flex-row-reverse ">
            <v-col class="d-flex justify-center mt-5" :cols="$vuetify.display.mdAndUp ? '4' : '12'">
                <v-card :width="$vuetify.display.mdAndUp ? '80%' : '100%'" color="" elevation="2">
                    <v-card-title class=" text-center text-h5 font-weight-black mt-2">باقة إنطلاقة</v-card-title>
                    <v-card-title class=" text-center text-h6 font-weight-black text-green-darken-1 mb-5">0 DH /
                        سنوي</v-card-title>
                    <v-list-item append-icon="mdi-check-circle" class="text-right text-green-darken-1">
                        <span class="font-weight-black text-subtitle-1 text-black">
                            متجر إلكتروني مرتبط بالواتساب
                        </span>
                    </v-list-item>
                    <v-list-item append-icon="mdi-check-circle" class="text-right text-green-darken-1">
                        <span class="font-weight-black text-subtitle-1 text-black">
                            عدد لا محدود من الطلبات
                        </span>
                    </v-list-item>
                    <v-list-item append-icon="mdi-check-circle" class="text-right text-green-darken-1">
                        <span class="font-weight-black text-subtitle-1 text-black">
                            عدد لا محدود من المنتجات
                        </span>
                    </v-list-item>
                    <router-link class="text-decoration-none" to="signup">
                        <v-card-actions class="d-flex justify-center mb-2 mt-2">
                            <v-btn rounded="pill" color="green-darken-1" size="x-large" variant="elevated" class="mt-5">
                                <div class="text-subtitle-1 ml-2 mr-2  text-white font-weight-black ">
                                    أنشئ متجرك
                                    <v-icon class="ml-2 ">mdi-arrow-right-circle</v-icon>
                                </div>
                            </v-btn>
                        </v-card-actions>
                    </router-link>
                </v-card>
            </v-col>
            <v-col class="d-flex justify-center mt-5" :cols="$vuetify.display.mdAndUp ? '4' : '12'">
                <v-card :width="$vuetify.display.mdAndUp ? '80%' : '100%'" color="green-lighten-5" elevation="2">
                    <v-card-title class=" text-center text-h5 font-weight-black mt-2">باقة محترف</v-card-title>
                    <v-card-title class=" text-center text-h6 font-weight-black text-green-darken-1 mb-5">950 DH /
                        سنوي</v-card-title>
                    <v-list-item append-icon="mdi-check-circle" class="text-right text-green-darken-1">
                        <span class="font-weight-black text-subtitle-1 text-black">كل مميزات باقة إنطلاقة
                        </span>
                    </v-list-item>
                    <v-list-item append-icon="mdi-check-circle" class="text-right text-green-darken-1">
                        <span class="font-weight-black text-subtitle-1 text-black">
                            تصميم موقع إحترافي
                        </span>
                    </v-list-item>
                    <v-list-item append-icon="mdi-check-circle" class="text-right text-green-darken-1">
                        <span class="font-weight-black text-subtitle-1 text-black">
                            رابط موقع مخصص
                        </span>
                    </v-list-item>
                    <v-card-actions class="d-flex justify-center mb-2 mt-2">
                        <a class="text-decoration-none text-white" target="_blank" href="https://wa.me/+212673090675">
                            <v-btn rounded="pill" color="green-darken-1" size="x-large" variant="elevated" class="mt-5">
                                <div class="text-subtitle-1 ml-2 mr-2 text-white font-weight-black ">
                                    تواصل معنا
                                    <v-icon class="ml-2 ">mdi-whatsapp</v-icon>
                                </div>
                            </v-btn>
                        </a>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
  
<script>
import logo from "../assets/matjary_logo_g.png";
import { useDisplay } from "vuetify";

import hero_gif from "../assets/gifs/hero.gif";
import orders_gif from "../assets/gifs/orders.gif";
import products_gif from "../assets/gifs/products.gif";

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
            products_gif: products_gif,
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
    padding-bottom: 50px;
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
</style>