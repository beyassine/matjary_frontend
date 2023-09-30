<template>
    <v-breadcrumbs class="breadcrumb">
        <v-row class="d-flex justify-center align-center">
            <h1 class="ma-3"> {{ $t('adminorders.orders') }}</h1>
        </v-row>
    </v-breadcrumbs>
    <v-container class="container ">
        <v-row class="d-flex justify-center">
            <v-col cols="12">
                <a ref="whatsappbtn" :href="whatsapplink" target="_blank" class="d-none">
                    <v-btn block color="green-darken-2" size="large" variant="elevated" class="text-h5">
                        واتساب
                    </v-btn>
                </a>
            </v-col>
            <v-col :cols="$vuetify.display.smAndUp ? '8' : '12'">
                <v-card v-if="order !== ''" class="mx-auto text-right">
                    <v-card elevation="0" :to="{ name: 'orderdetail', params: { orderId: order.id } }">
                        <v-card-item>
                            <v-card-text>
                                <v-chip class="ma-2" :color="getstatus(order.orderstatus).color">
                                    {{ getstatus(order.orderstatus).text }}
                                    <v-icon class="ml-2">
                                        {{ getstatus(order.orderstatus).icon }}
                                    </v-icon>
                                </v-chip>
                            </v-card-text>
                            <v-row>
                                <v-col cols="6">
                                    <h4 v-if="order.shippingoption == 'pickup'">
                                        <v-icon>mdi-store-marker-outline</v-icon>
                                        {{ $t('adminorders.pickup') }}
                                    </h4>
                                    <h4 v-if="order.shippingoption == 'delivery'">
                                        <v-icon>mdi-moped-outline</v-icon>
                                        {{ $t('adminorders.delivery') }}
                                    </h4>
                                </v-col>
                                <v-col cols="6">
                                    <h5 class="">{{ $t('adminorders.datecreated') }}</h5>
                                    <h4>{{ formatedDate(order.created_at) }}</h4>
                                </v-col>
                                <v-col cols="6">
                                    <h5 class="">{{ $t('adminorders.name') }}</h5>
                                    <h4>{{ order.clientname }}</h4>
                                </v-col>
                                <v-col cols="6">
                                    <h5 class=" ">{{ $t('adminorders.phone') }} </h5>
                                    <h4>{{ order.phone }}</h4>
                                </v-col>
                                <v-divider></v-divider>
                                <v-col cols="12">
                                    <h3 class="text-center">{{ $t('adminorders.products') }}</h3>
                                    <div v-for="product in order.products">
                                        <div v-if="product.options.length == 0 && JSON.parse(product.addons.length) == 0">
                                            <div class="d-flex flex-no-wrap align-center justify-end  mb-3 ">
                                                <div class="d-flex flex-no-wrap align-center justify-end ">
                                                    <div class="mr-2">
                                                        <h4 class="text-right">{{ product.quantity }} x {{ product.name }}
                                                        </h4>
                                                    </div>
                                                    <v-avatar class="mr-5 ml-5" size="50" rounded="0">
                                                        <v-img :src="product.img"></v-img>
                                                    </v-avatar>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-if="product.options.length > 0">
                                            <div v-for="option in product.options">
                                                <div class="d-flex flex-no-wrap align-center justify-end mb-3 ">
                                                    <div class="d-flex flex-no-wrap align-center justify-end ">
                                                        <div class="mr-2">
                                                            <h4 class="text-right"> {{ option.quantity }} x {{ product.name
                                                            }}
                                                            </h4>
                                                            <h4 class="text-right text-grey">{{ option.name }}</h4>
                                                        </div>
                                                        <v-avatar class="mr-5 ml-5" size="50" rounded="0">
                                                            <v-img :src="product.img"></v-img>
                                                        </v-avatar>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-if="JSON.parse(product.addons.length) > 0">
                                            <div v-for="addon in JSON.parse(product.addons)">
                                                <div v-if="parseFloat(addon.total_product) > 0">
                                                    <div class="d-flex flex-no-wrap align-center justify-end mb-3">
                                                        <div class="d-flex flex-no-wrap ">
                                                            <div class="">
                                                                <h4 class="text-left">{{ addon.quantity }} x {{ product.name
                                                                }}</h4>
                                                                <div class="d-flex align-center justify-start ma-2">
                                                                    <div class="">
                                                                        <div class=""
                                                                            v-for="key in Object.keys(addon.options)">
                                                                            <h5 class="text-left">{{ key }} :</h5>
                                                                            <div
                                                                                v-for="addonkey in Object.keys(addon.options[key]['addons'])">
                                                                                <h5 v-if="addon.options[key]['addons'][addonkey]['quantity'] > 0"
                                                                                    class="text-left text-grey">
                                                                                    {{
                                                                                        addon.options[key]['addons'][addonkey]['quantity']
                                                                                    }} x {{ addonkey }}
                                                                                </h5>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <v-avatar class="mr-5 ml-5" size="50" rounded="0">
                                                                <v-img :src="product.img"></v-img>
                                                            </v-avatar>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <v-divider></v-divider>
                                </v-col>
                                <v-col cols="4">
                                    <h5 class="">{{ $t('adminorders.totalorder') }}</h5>
                                    <h4>{{ order.total_order }} {{ $t('currency.DH') }}</h4>
                                </v-col>
                                <v-col cols="4">
                                    <h5 class="">{{ $t('adminorders.shipcost') }}</h5>
                                    <h4>{{ order.shipcost }} {{ $t('currency.DH') }}</h4>
                                </v-col>
                                <v-col cols="4">
                                    <h5 class="">{{ $t('adminorders.totalproducts') }}</h5>
                                    <h4>{{ order.total_products }} {{ $t('currency.DH') }}</h4>
                                </v-col>
                            </v-row>
                            <v-divider class="mt-2"></v-divider>
                        </v-card-item>
                    </v-card>
                    <v-card-item>
                        <v-row>
                            <v-col v-if="order.orderstatus == 'enregistred'" cols="12">
                                <v-btn block color="green-darken-1" size="large" variant="elevated"
                                    :loading="order.validloading" @click="validateOrder(order)" class="text-white">
                                    <h4>{{ $t('adminorders.confirmorder') }}</h4>
                                    <v-icon class="ml-2">mdi-check</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col cols="12">
                                <a class="text-decoration-none text-white" target="_blank"
                                    :href="'https://wa.me/' + order.phone.replace(/\s/g, '')">
                                    <v-btn block color="grey" size="large" variant="elevated" class="text-white mt-2">
                                        <h4>{{ $t('adminorders.sendwhatsapp') }}</h4>
                                        <v-icon class="ml-2">mdi-whatsapp</v-icon>
                                    </v-btn>
                                </a>
                            </v-col>
                        </v-row>
                    </v-card-item>
                </v-card>
                <h3 v-if="order == ''" class="text-center"><v-icon size="60">mdi-shopping-search-outline</v-icon></h3>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
import { useI18n } from 'vue-i18n'
import { mapGetters } from "vuex";
import { format } from "date-fns";
import axiosInstance from "../../axios/axiosInstance";
import { useDisplay } from "vuetify";

export default {
    setup() {
        const { display } = useDisplay();
    },

    components: {},

    data() {
        return {
            storeId: "",
            orderId: this.$route.params.orderId,
            whatsapplink: '',
            lang:'',
            order: '',
            orderstatus: ''
        };
    },

    computed: {
        ...mapGetters(["getStoreId", "getstoreLang"]),
    },

    methods: {
        getstatus(text) {
            if (this.lang == 'ar') {
                if (text === "enregistred") {
                    return {
                        title: "الطلبات المسجلة",
                        text: "مسجل",
                        color: "grey",
                        icon: "mdi-tag",
                    };
                } else if (text === "valid") {
                    return {
                        title: "الطلبات المؤكدة",
                        text: "مؤكد",
                        color: "green",
                        icon: "mdi-check-bold",
                    };
                } else if (text === "canceled") {
                    return {
                        title: "الطلبات الملغية",
                        text: "ملغى",
                        color: "red",
                        icon: "mdi-close-thick",
                    };
                }
            } else if (this.lang == 'fr') {
                if (text === "enregistred") {
                    return {
                        title: "Commandes Enregistrées",
                        text: "Enregistrée",
                        color: "grey",
                        icon: "mdi-tag",
                    };
                } else if (text === "valid") {
                    return {
                        title: "Commandes Validées",
                        text: "Validée",
                        color: "green",
                        icon: "mdi-check-bold",
                    };
                } else if (text === "canceled") {
                    return {
                        title: "Commandes Annulées",
                        text: "Annulée",
                        color: "red",
                        icon: "mdi-close-thick",
                    };
                }
            }
        },
        formatedDate(date) {
            const mydate = new Date(date);
            return format(mydate, "dd/MM/yyyy");
        },
        validateOrder(order, index) {
            var text = ''
            order.validloading = true
            if (this.lang == 'ar') {
                text = "مرحبًا لقد تم تأكيد طلبكم "
            } else if (this.lang == 'fr') {
                text = "Votre commande est confirmée"
            }
            this.whatsapplink = 'https://wa.me/' + order.phone.replace(/\s/g, '') + "?text=" + text
            axiosInstance.post(`/order/validate/${order.id}/${this.storeId}`).then((response) => {
                if (response.status === 200) {
                    this.$refs.whatsappbtn.click()
                    order.orderstatus = 'valid'
                    order.validloading = false
                }
            });
        },
        cancelOrder(order) {
            order.cancelloading = true
            axiosInstance.post(`/order/cancel/${order.id}/${this.storeId}`).then((response) => {
                if (response.status === 200) {
                    order.orderstatus = 'canceled'
                    order.cancelloading = false
                }
            });

        },
    },
    created() {
        const t = useI18n()
        this.storeId = this.getStoreId;
        this.lang = this.getstoreLang;
        axiosInstance
            .get(`/order/get/${this.orderId}`)
            .then((response) => {
                this.orderstatus = response.data.orderstatus
                this.order = response.data;
            })
            .catch((err) => { });
        t.locale.value = this.lang
        return { t }
    },
};
</script>
<style scoped>
.active {
    background-color: aqua;
}
</style>
  