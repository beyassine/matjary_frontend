<template>
    <v-breadcrumbs class="breadcrumb">
        <v-row class="d-flex justify-center align-center">
            <v-col cols="7"> </v-col>
            <v-col align="end" cols="5">
                <h1 class="">الطلبات</h1>
            </v-col>
        </v-row>
    </v-breadcrumbs>
    <v-container class="container " v-if="orders.length !== 0">
        <v-row class="d-flex justify-center">
            <v-col cols="12">
                <a ref="whatsappbtn" :href="whatsapplink"  target="_blank" class="d-none">
                    <v-btn block color="green-darken-2" size="large" variant="elevated" class="text-h5">
                        واتساب
                    </v-btn>
                </a>
            </v-col>
            <v-col v-for="(order, index) in orders" :key="order.id" :cols="$vuetify.display.smAndUp ? '8' : '12'">
                <v-card class="mx-auto text-right">
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
                                <h5 class=" ">: رقم الهاتف </h5>
                                <h4>{{ order.phone }}</h4>
                                <v-divider class="mt-2 mb-2"></v-divider>
                                <h5 class="">: المدينة</h5>
                                <h4>{{ order.shipcity }}</h4>
                                <v-divider class="mt-2"></v-divider>
                            </v-col>
                            <v-col cols="6">
                                <h5 class="">: تاريخ الطلب </h5>
                                <h4>{{ formatedDate(order.created_at) }}</h4>
                                <v-divider class="mt-2 mb-2"></v-divider>
                                <h5 class="">: الإسم الكامل</h5>
                                <h4>dwe {{ order.clientname }}</h4>
                                <v-divider class="mt-2"></v-divider>
                            </v-col>
                            <v-col cols="6">
                                <h5 class="">: الكمية</h5>
                                <h4>{{ order.products.quantity }}</h4>
                                <v-divider class="mt-2"></v-divider>
                            </v-col>
                            <v-col cols="6">
                                <h5 class="">: المنتجات</h5>
                                <h4>{{ order.products.name }}</h4>
                                <v-divider class="mt-2"></v-divider>
                            </v-col>
                            <v-col cols="4">
                                <h5 class="">: الثمن الإجمالي </h5>
                                <h4>{{ order.total_order }} د.م</h4>
                                <v-divider class="mt-2"></v-divider>
                            </v-col>
                            <v-col cols="4">
                                <h5 class="">: ثمن الشحن</h5>
                                <h4>{{ order.shipcost }} د.م</h4>
                                <v-divider class="mt-2"></v-divider>
                            </v-col>
                            <v-col cols="4">
                                <h5 class="">: ثمن المنتجات</h5>
                                <h4>{{ order.total_products }} د.م</h4>
                                <v-divider class="mt-2"></v-divider>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col  v-if="order.orderstatus == 'enregistred'" cols="12">
                                <v-btn block color="green-darken-1" size="large" variant="elevated"
                                    :loading="order.validloading" @click="validateOrder(order)" class="text-white mt-3">
                                    <h4>تأكيد الطلب </h4>
                                    <v-icon class="ml-2">mdi-whatsapp</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col  v-if="order.orderstatus == 'valid'" cols="12">
                                <a class="text-decoration-none text-white" target="_blank"
                                    :href="'https://wa.me/' + order.phone.replace(/\s/g, '')">
                                    <v-btn block color="grey" size="large" variant="elevated" class="text-white mt-3">
                                        <h4>ابعث واتساب</h4>
                                        <v-icon class="ml-2">mdi-whatsapp</v-icon>
                                    </v-btn>
                                </a>
                            </v-col>
                        </v-row>
                    </v-card-item>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    <v-container class="mt-5" v-if="orders.length === 0">
        <h2 class="text-center mt-5 font-weight-regular">
            ! لا يوجد أي طلب <br />
        </h2>
    </v-container>
</template>
  
<script>
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
            whatsapplink:'',
            orders: [],
        };
    },

    computed: {
        ...mapGetters(["getStoreId"]),
        statusCounts() {
            const counts = {};
            this.orders.forEach((order) => {
                counts[order.orderstatus] = counts[order.orderstatus] + 1 || 1;
            });
            return counts;
        },
    },

    methods: {
        getstatus(text) {
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
        },
        formatedDate(date) {
            const mydate = new Date(date);
            return format(mydate, "dd/MM/yyyy");
        },
        validateOrder(order, index) {
            order.validloading = true
            this.whatsapplink='https://wa.me/' + order.phone.replace(/\s/g, '') + "?text=" + "مرحبًا لقد تم تأكيد طلبكم "+ ":" + "%0a" + "%0a" + "- " + order.products.name + "%0a"+ "- " + "الكمية" + ": " +  order.products.quantity + "%0a" + "- " + "المدينة" + ": " + order.shipcity+ "%0a" + "- " + "الثمن الإجمالي"+ ": " + order.total_order + "د.م" + "%0a"+ "%0a" + "شكرا"
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
        this.storeId = this.getStoreId;
        axiosInstance
            .get(`/order/getbyuser/${this.storeId}`)
            .then((response) => {
                this.orders = response.data;
            })
            .catch((err) => { });
    },
};
</script>
<style scoped>
.active {
    background-color: aqua;
}
</style>
  