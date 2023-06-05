<template>
    <ExtendHeader bordered="false" />
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