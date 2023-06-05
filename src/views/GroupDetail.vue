<template>
    <ExtendHeader bordered="true" />
    <v-container class="mt-5 ">
        <v-row class="d-flex flex-row-reverse">
            <v-col class="bg-white" :cols="$vuetify.display.smAndUp ? '6' : '12'">
                <v-card-text class="text-right">
                    <h2>{{ productname }}</h2>
                </v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-img height="250px" :src="bigImage" />
                    </v-col>
                    <v-col cols="3" v-for="(image, index) in images" :key="index">
                        <v-img height="80px" :src="image" @click="selectImage(index)" />
                    </v-col>
                </v-row>
                <v-card-text class="mt-3 text-right">
                    <v-chip size="large" class="mb-3" :color="getstatus('registred').color">
                        {{ getstatus('registred').text }}
                        <v-icon class="ml-2">
                            {{ getstatus('registred').icon }}
                        </v-icon>
                    </v-chip>
                    <p>
                        <span class="text-decoration-line-through text-h6">{{ unitprice }} DH</span> <span
                            class="text-h4 text-green ml-2"> {{ groupprice }} DH</span>
                    </p>
                    <h3 class="text-red mt-3"> 3 h 57 min : الوقت المتبقي <v-icon class="ml-2">mdi-timer-outline</v-icon>
                    </h3>
                    <h3 class="mt-2"> {{ groupquantity }} : عدد المشترين المطلوب <v-icon class="ml-2">mdi-check-circle-outline</v-icon></h3>
                    <h3 class="mt-2"> {{ buyers_count }} : عدد المشترين الحالي <v-icon class="ml-2">mdi-account-group</v-icon></h3>
                </v-card-text>
                <v-card-actions>
                    <v-btn block color="green-lighten-1" size="large" variant="elevated" class="mt-5">
                        <h3>أضف مشترين إلى المجموعة <v-icon>mdi-whatsapp</v-icon> </h3>
                    </v-btn>
                </v-card-actions>
            </v-col>
            <v-col class="bg-white" :cols="$vuetify.display.smAndUp ? '6' : '12'">
                <v-card-title class="mb-3">
                    <h3 class="text-right text-green">أضف طلبك</h3>
                    <v-divider></v-divider>
                </v-card-title>
                <v-form v-model="valid">
                    <v-card-item class="mt-3">
                        <div class="text-right align-center">
                            <h3 class="mb-3">* الكمية المطلوبة <v-icon class="ml-2">mdi-layers-outline</v-icon></h3>
                            <v-row class="mt-2">
                                <v-col cols="4"><v-btn size="x-large" variant="text" @click="decrement">
                                        <h2>-</h2>
                                    </v-btn></v-col>
                                <v-col cols="4"><v-text-field outlined type="number" reverse v-model="quantity"
                                        :readonly="loading" dense></v-text-field></v-col>
                                <v-col cols="4"><v-btn size="x-large" variant="text" @click="increment">
                                        <h2>+</h2>
                                    </v-btn></v-col>
                            </v-row>
                        </div>

                    </v-card-item>
                    <v-card-item>
                        <div class="text-right align-center">
                            <h3 class="mb-3">الإسم الكامل<v-icon class="ml-2">mdi-pencil-outline</v-icon></h3>
                            <v-text-field outlined type="text" reverse v-model="fullname" :readonly="loading"
                                dense></v-text-field>
                        </div>
                    </v-card-item>
                    <v-card-item>
                        <div class="text-right align-center">
                            <div>
                                <h3 class="mb-3"> * رقم الواتساب <v-icon class="text-green ml-2">mdi-whatsapp</v-icon>
                                </h3>
                                <vue-tel-input class="tel-input" v-model="phone" v-bind="bindProps"
                                    @validate="check"></vue-tel-input>
                                <h5 v-if="telerror" class="text-red">{{ telmsgerror }}</h5>
                            </div>
                        </div>
                    </v-card-item>
                    <v-card-item>
                        <div class="text-right align-center mt-2">
                            <h3 class="mb-3">* المدينة<v-icon class="ml-2">mdi-map-marker-outline</v-icon></h3>
                            <v-select outlined v-model="selectedcity" :items="cities" item-title="city"
                                item-value="cost" :rules="required" return-object></v-select>
                        </div>
                    </v-card-item>
                    <v-card-title>
                        <h3 class="text-right mb-3">ملخص الطلب</h3>
                        <v-divider></v-divider>
                    </v-card-title>
                    <v-card-title class="text-right">
                        <h4>
                            {{ total_products.toFixed(2) }} : ثمن المنتجات الإجمالي
                        </h4>
                    </v-card-title><v-card-title class="text-right">
                        <h4>{{ parseFloat(shipcost).toFixed(2) }} : ثمن الشحن</h4>
                    </v-card-title>
                    <v-card-title class="text-right">
                        <h4>{{ total_order.toFixed(2) }} : الثمن الإجمالي للطلب</h4>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn block color="green-lighten-1" size="large" variant="elevated" class="mt-5" @click="addOrder"
                            :disabled="valid" :loading="loading">
                            <h4>تأكيد الطلب</h4>
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex";
import { useDisplay } from "vuetify";
import axios from "axios";


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
            groupId: this.$route.params.groupId,
            admin_phone: this.$route.query.phone,  
            token:this.$route.query.token,
            // Group Detail
            buyers: '',
            created_at: '',
            product_id:'',
            productname: '',      
            unitprice:'',
            groupprice:'',
            groupquantity:'',    
            images: '',
            groupstatus:'',
            selectedItem: 0,
            // coordinates form
            active_buyer:'',
            cart: '',
            valid: false,
            loading: false,
            required: [(v) => !!v || "لا يجوز أن يُترَك هذا الحقل فارغًا"],
            quantity: 1,
            fullname: "",
            phone: '',
            selectedcity: "",
            cities: [
                { city: "الدار البيضاء", cost: "40" },
                { city: "الرباط", cost: "20" },
                { city: "مراكش", cost: "40" },
                { city: "اكادير", cost: "40" },
                { city: "طنجة", cost: "40" },
                { city: "فاس", cost: "40" },
                { city: "سلا", cost: "20" },
                { city: "القنيطرة", cost: "40" },
                { city: "مكناس", cost: "40" },
                { city: "وجدة", cost: "40" },
                { city: "تمارة", cost: "40" },
                { city: "الجديدة", cost: "40" },
                { city: "المحمدية", cost: "40" },
                { city: "تطوان", cost: "40" },
                { city: "الناظور", cost: "40" },
                { city: "آسفي", cost: "40" },
                { city: "بني ملال", cost: "40" },
                { city: "خريبكة", cost: "40" },
                { city: "بوزنيقة", cost: "40" },
                { city: "سطات", cost: "40" },
            ],
            //vue-tel-input
            telerror: false,
            telmsgerror: '',
            validatetel: "",
            isvalildtel: false,
            bindProps: {
                mode: "international",
                defaultCountry: "MA",
                disabledFetchingCountry: false,
                disabled: false,
                disabledFormatting: false,
                required: false,
                enabledCountryCode: true,
                enabledFlags: true,
                onlyCountries: ['MA'],
                ignoredCountries: [],
                autocomplete: "off",
                name: "phone",
                maxLen: 25,
                wrapperClasses: "",
                inputClasses: "",
                dropdownOptions: {
                    disabledDialCode: false,
                    showDialCodeInList: true,
                    showDialCodeInSelection: false,
                    showFlags: true,
                },
                inputOptions: {
                    showDialCode: false,
                },
            },
        };
    },

    computed: {
        bigImage() {
            return this.images[this.selectedItem];
        },
        buyers_count(){
            return this.buyers.length
        },
        total_products: function () {            
            return parseFloat(this.quantity) + parseFloat(this.groupprice) ;
        },
        shipcost: function () {
            if (this.selectedcity == '') {
                return 0
            }
            return this.selectedcity['cost']
        },
        shipcity: function () {
            if (this.selectedcity == '') {
                return ''
            }
            return this.selectedcity['city']
        },
        total_order: function () {
            return parseFloat(this.total_products) + parseFloat(this.shipcost)
        }
    },

    methods: {
        getstatus(text) {
            if (text === "registred") {
                return {
                    text: "في إنتظار المشترين",
                    color: "grey",
                    icon: "mdi-timer-sand",
                };
            } else if (text === "valid") {
                return {
                    text: "شراء مؤكد",
                    color: "green",
                    icon: "mdi-check-bold",
                };
            } else if (text === "ended") {
                return {
                    text: "إنتهت",
                    color: "red",
                    icon: "mdi-close-thick",
                };
            }
        },
        increment() {
            this.quantity++;
        },
        decrement() {
            if (this.quantity > 1) {
                this.quantity--;
            }
        },
        check(telnumber) {
            if (telnumber.formatted !== '') {
                if (telnumber.valid) {
                    this.isvalildtel = true;
                    this.validatetel = telnumber.number;
                    this.telerror = false;
                    this.telmsgerror = ''
                } else {
                    this.isvalildtel = false;
                    this.validatetel = "";
                    this.telerror = true;
                    this.telmsgerror = "رقم الهاتف غير صحيح";
                }
            }
        },
        selectImage(index) {
            this.selectedItem = index;
        },
        // submit Form
        addOrder() {
            this.loading = true
            const fd = {
                user_id: this.getUserId,
                products: Object.values(this.cart),
                total_products: this.total_products,
                phone: this.phone,
                shipcity: this.shipcity,
                shipcost: this.shipcost,
                total_order: this.total_order,
                clientname: this.clientname,
                orderstatus: 'registred'
            }
            axiosInstance.post(`/order/create`, fd).then((response) => {
                if (response.status === 200) {
                    Cookies.set("cart", JSON.stringify({}));
                    this.removeiscart();
                    this.$router.push({
                        name: "orders",
                    });
                }
            });
        },
    },

    created() {
        axios
            .get(`/order/getgroup/${this.groupId}/${this.admin_phone}/${this.token}`)
            .then((response) => {
                this.buyers = response.data.buyers
                this.created_at = response.data.created_at
                this.productname = response.data.productname
                this.unitprice= response.data.unitprice
                this.groupprice= response.data.groupprice
                this.groupquantity=response.data.groupquantity
                this.groupstatus=response.data.groupstatus
                this.buyers=response.data.buyers
                this.active_buyer=response.data.buyers.find(item => item.buyer_token == this.token)
                this.phone=this.active_buyer.phone
                this.fullname=this.active_buyer.fullname
                this.quantity=this.active_buyer.quantity
                this.images = response.data.images
            })
            .catch((err) => { });

    },
};
</script>
<style scoped>
</style>
  