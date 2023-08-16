<template>
    <div class="header">
        <div class="d-flex justify-center align-center ">
            <div>
                <router-link class="text-decoration-none text-black" :to="{
                    name: 'storedetail',
                    params: { storeId: this.storeId }
                }">
                    <v-img height="120" :src="logo == null || logo == ''
                        ? src2
                        : logo
                        "></v-img>
                    <h4 class="text-center mt-1">{{ storename }}</h4>
                </router-link>
            </div>
        </div>
        <div class=" d-flex align-center justify-center mt-3">
            <div class="text-center ma-3 pa-3">
                <a :href="'tel:+' + this.telephone.replace(/\s/g, '')">
                    <v-icon class="mb-1" color="grey-darken-3" icon="mdi-phone-in-talk-outline" size="35"></v-icon>
                </a>
            </div>
            <div class="text-center ma-3 pa-3">
                <a target="_blank" :href="'https://wa.me/' + this.whatsapp.replace(/\s/g, '')">
                    <v-icon class="mb-1" color="grey-darken-3" icon="mdi-whatsapp" size="35"></v-icon>
                </a>
            </div>
            <div class="text-center ma-3 pa-3">
                <a target="_blank" :href="this.maps">
                    <v-icon class="mb-1" color="grey-darken-3" icon="mdi-map-marker-radius-outline" size="35"></v-icon>
                </a>
            </div>
        </div>
    </div>
    <div :class="$vuetify.display.mdAndUp ? 'homecontainer-lg' : 'homecontainer-sm'">
        <div>
            <v-select v-model="selectedCategory" :items="categories" item-text="category" item-value="category">
            </v-select>
        </div>
        <h3 v-if="allproducts.length == 0" class="text-center"><v-icon size="60">mdi-shopping-search-outline</v-icon></h3>
        <v-row v-for="(categoryProducts, category) in filteredProducts" :key="category"
            class="d-flex flex-row-reverse mt-2">
            <v-col cols="12" class="text-center">
                <h2 class="text-green">{{ category }}</h2>
            </v-col>
            <v-col v-for="(product, index) in categoryProducts" :key="product.id"
                :cols="$vuetify.display.mdAndUp ? '4' : '12'">
                <v-card @click="showProduct(product)" class="mb-1" elevation="1">
                    <div class="d-flex justify-space-between align-center">
                        <div class="text-green ma-5">
                            <h1>+</h1>
                        </div>
                        <div class="d-flex flex-no-wrap align-center justify-end ma-1">
                            <div class="mr-2">
                                <h3 class="text-right">{{ product.productname }}</h3>
                                <h3 class="text-right text-green-darken-1 font-weight-bold mt-2 ml-2">
                                    {{ parseFloat(product.unitprice).toFixed(2) }} {{ $t('currency.DH') }}
                                </h3>
                            </div>
                            <div class="d-flex flex-no-wrap justify-center ma-1">
                                <v-avatar class="ma-1" size="80" rounded="0">
                                    <v-img :src="product.images == null || product.images == ''
                                        ? src1
                                        : product.images[0]"></v-img>
                                </v-avatar>
                            </div>
                        </div>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </div>
    <div class="text-center">
        <v-dialog class="dialog" v-model="dialog" width="90%">
            <v-card>
                <v-row style="padding: 20px;">
                    <v-col cols="12">
                        <v-img height="200px" :src="bigImage" />
                    </v-col>
                    <v-col cols="3" v-if="filteredImages.length > 1" v-for="(image, index) in filteredImages" :key="index">
                        <v-img v-if="image !== ''" height="80px" :src="image" @click="selectImage(index)" />
                    </v-col>
                </v-row>
                <v-card-text class="mb-2">
                    <h2 class="mb-2 text-center">{{ modalProduct.productname }}</h2>
                    <v-radio-group v-if="modalProduct.options.length > 0" v-model="modalOption">
                        <v-radio class="ml-2" color="green" v-for="option in modalProduct.options" :value="option">
                            <template v-slot:label>
                                <h3>{{ option.name }} - <strong>{{ option.cost }} {{ $t('currency.DH') }}</strong></h3>
                            </template>
                        </v-radio>
                    </v-radio-group>
                    <h3 v-if="modalProduct.options.length == 0" class="text-green-darken-1 font-weight-bold">
                        {{ parseFloat(modalProduct.unitprice).toFixed(2) }} {{ $t('currency.DH') }}
                    </h3>
                </v-card-text>
                <v-card-text class="d-flex flex-no-wrap justify-center mb-5">
                    <div class="d-flex justify-space-between">
                        <v-btn class="text-green-darken-1" size="large" variant="text" @click="decrementCounter">
                            <h1>-</h1>
                        </v-btn>
                        <h2 class="ma-2">{{ modalQuantity }}</h2>
                        <v-btn class="text-green-darken-1" size="large" variant="text" @click="incrementCounter">
                            <h1>+</h1>
                        </v-btn>
                    </div>
                </v-card-text>
                <v-card-actions class="mb-5">
                    <v-btn block color="green-lighten-1" size="large" variant="elevated" class="text-h6 text-white"
                        @click="addModalproduct(modalProduct)">
                        {{ $t('store.add_to_cart') }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
    <v-bottom-navigation v-if="showCart" style="height: 70px;" elevation="0">
        <v-icon class="float d-flex justify-center align-center" size="x-large" icon="mdi-shopping-outline"
            @click.stop="drawer = !drawer"></v-icon>
    </v-bottom-navigation>
    <v-navigation-drawer v-model="drawer" location="right" style="padding: 10px;" temporary>
        <h3 class="text-center mt-2 mb-5">{{ $t('store.products') }}</h3>
        <v-divider class="mb-5"></v-divider>
        <v-card v-for="(product, index) in cart_products" :key="product.id" class="ma-2 " elevation="0">
            <div v-if="Object.keys(this.cart_products[product.id]['options']).length == 0">
                <div class="d-flex flex-no-wrap align-center justify-end ">
                    <div class="d-flex flex-no-wrap align-center justify-end ">
                        <div class="mr-2">
                            <h3 class="text-right">{{ product.name }}</h3>
                            <h3 class="text-right text-green-darken-1 font-weight-bold mt-2 ml-2">{{
                                parseFloat(product.total_product).toFixed(2) }} {{ $t('currency.DH') }}</h3>
                        </div>
                        <v-avatar class="ma-1" size="50" rounded="0">
                            <v-img :src="product.img"></v-img>
                        </v-avatar>
                    </div>
                </div>
                <div class="d-flex flex-no-wrap justify-space-between ma-2 ">
                    <div class="d-flex justify-space-between">
                        <v-btn class="text-green-darken-1" size="large" variant="text" @click="decrement(product)">
                            <h1>-</h1>
                        </v-btn>
                        <h2 class="ma-2">{{ product.quantity }}</h2>
                        <v-btn class="text-green-darken-1" size="large" variant="text" @click="increment(product)">
                            <h1>+</h1>
                        </v-btn>
                    </div>
                </div>
            </div>
            <div v-if="Object.keys(this.cart_products[product.id]['options']).length > 0">
                <div v-for="option in product.options">
                    <div class="d-flex flex-no-wrap align-center justify-end ">
                        <div class="d-flex flex-no-wrap align-center justify-end ">
                            <div class="mr-2">
                                <h3 class="text-right">{{ product.name }}</h3>
                                <h4 class="text-right text-grey">{{ option.name }}</h4>
                                <h3 class="text-right text-green-darken-1 font-weight-bold mt-2 ml-2">{{
                                    parseFloat(option.total_product).toFixed(2) }} {{ $t('currency.DH') }}</h3>
                            </div>
                            <v-avatar class="ma-1" size="50" rounded="0">
                                <v-img :src="product.img"></v-img>
                            </v-avatar>
                        </div>
                    </div>
                    <div class="d-flex flex-no-wrap justify-space-between ma-2 ">
                        <div class="d-flex justify-space-between">
                            <v-btn class="text-green-darken-1" size="large" variant="text"
                                @click="decrementoption(product, option.name)">
                                <h1>-</h1>
                            </v-btn>
                            <h2 class="ma-2">{{ option.quantity }}</h2>
                            <v-btn class="text-green-darken-1" size="large" variant="text"
                                @click="incrementoption(product, option.name)">
                                <h1>+</h1>
                            </v-btn>
                        </div>
                    </div>
                </div>
                <v-divider></v-divider>
            </div>
        </v-card>
        <template v-slot:append>
            <div class="pa-2">
                <v-divider></v-divider>
                <h3 class="ma-3 text-center">{{ total_products }} {{ $t('currency.DH') }}</h3>
                <router-link class="text-decoration-none d-flex justify-center" :to="{
                    name: this.storeCartName,
                    params: { storeId: this.storeId }
                }">
                    <v-btn color="green-lighten-1" variant="elevated" class="text-white" block>
                        <h3 class="ma-3"> {{ $t('store.cart') }}<v-icon class="ml-2">mdi-arrow-right</v-icon></h3>
                    </v-btn>
                </router-link>
            </div>
        </template>
    </v-navigation-drawer>
</template>
  
<script>
import { useI18n } from 'vue-i18n'
import axios from "axios";
import Cookies from 'js-cookie'

import store from '../../store';
import { mapGetters, mapActions } from "vuex";
import { useDisplay } from "vuetify";

import imagevoid from "../../assets/void.png";
import storevoid from "../../assets/void_store.png";


import ExtendHeader from "../../components/ExtendHeader";

export default {
    setup() {
        const { display } = useDisplay();
    },

    components: {
        ExtendHeader
    },

    data() {
        return {
            storeId: this.$route.params.storeId,
            telephone: '',
            whatsapp: '',
            maps: '',
            src1: imagevoid,
            src2: storevoid,
            storename: '',
            logo: '',
            allproducts: '',
            categories: ['-----'],
            selectedCategory: '',
            lang: 'ar',
            // product detail
            dialog: false,
            modalProduct: '',
            modalOption: '',
            modalQuantity: 1,
            filteredImages: '',
            selectedItem: 0,
            // cart 
            drawer: null,
            cart_products: {},
        };
    },

    computed: {
        ...mapGetters(["iscart"]),
        filteredProducts() {
            if (this.selectedCategory == '' || this.selectedCategory == '-----') {
                return this.groupedProducts;
            }
            const filtered = {};
            filtered[this.selectedCategory] = this.groupedProducts[this.selectedCategory];
            return filtered;
        },
        groupedProducts() {
            const grouped = {};
            if (Array.isArray(this.allproducts)) {
                this.allproducts.forEach(product => {
                    const category = product.categorie;
                    if (!grouped[category]) {
                        grouped[category] = [];
                        this.categories.push(category)
                    }
                    grouped[category].push(product);
                });
            }
            return grouped;
        },
        total_products: function () {
            let total = 0
            for (const product in this.cart_products) {
                if (Object.keys(this.cart_products[product]['options']).length > 0) {
                    for (const option in this.cart_products[product]['options']) {
                        total += parseFloat(this.cart_products[product]['options'][option]['total_product'])
                    }
                }
                else {
                    total += parseFloat(this.cart_products[product]['total_product'])
                }
            }
            return total
        },

        bigImage() {
            return this.filteredImages[this.selectedItem];
        },
        showCart() {
            if (this.iscart && !this.drawer) {
                return true
            }
        },
        storeCartName() {
            return this.lang + 'storecart'
        }
    },

    methods: {
        ...mapActions(["setiscart"]),

        selectImage(index) {
            this.selectedItem = index;
        },

        showProduct(product) {
            this.modalProduct = product
            if (product.options.length > 0) {
                this.modalOption = product.options[0]
            }
            this.filteredImages = product.images.filter(url => url !== '');
            this.selectedItem = 0
            this.dialog = true
        },
        saveCartInCookies() {
            Cookies.set(("cart_" + this.storeId), JSON.stringify(this.cart_products))
        },
        addModalproduct() {
            // Check if the product already exists in the cart
            if (!this.cart_products[this.modalProduct.id]) {
                this.cart_products[this.modalProduct.id] = {
                    id: this.modalProduct.id,
                    name: this.modalProduct.productname,
                    img: this.modalProduct.images[0],
                    options: {},
                };
            }
            // Check if product has options
            if (this.modalProduct.options.length > 0) {
                // Check if the product with the same option already exists in the cart
                if (this.cart_products[this.modalProduct.id][this.modalOption.name]) {
                    // If the product with the same option already exists, update its quantity
                    this.cart_products[this.modalProduct.id]['options'][this.modalOption.name].quantity = this.modalQuantity;
                    this.cart_products[this.modalProduct.id]['options'][this.modalOption.name].total_product = parseFloat(this.modalOption.cost) * parseFloat(this.cart_products[this.modalProduct.id][this.modalOption.name].price)
                } else {
                    // Otherwise, add the product with the given option to the cart
                    this.cart_products[this.modalProduct.id]['options'][this.modalOption.name] = {
                        name: this.modalOption.name,
                        quantity: this.modalQuantity,
                        price: this.modalOption.cost,
                        total_product: parseFloat(this.modalOption.cost) * parseFloat(this.modalQuantity),
                    };
                }
            } else {
                this.cart_products[this.modalProduct.id]['quantity'] = this.modalQuantity
                this.cart_products[this.modalProduct.id]['price'] = this.modalProduct.unitprice
                this.cart_products[this.modalProduct.id]['total_product'] = parseFloat(this.modalProduct.unitprice) * parseFloat(this.modalQuantity)
            }
            this.saveCartInCookies()
            this.setiscart()
            this.modalQuantity = 1
            this.dialog = false
        },

        increment(product) {
            product.quantity += 1
            product.total_product = parseFloat(product.price) * product.quantity
            this.saveCartInCookies()

        },
        decrement(product) {
            if (product.quantity > 1) {
                product.quantity -= 1
                product.total_product = parseFloat(product.price) * product.quantity
            } else {
                delete this.cart_products[product.id]
            }
            this.saveCartInCookies()
        },

        incrementoption(product, optionName) {
            product['options'][optionName].quantity += 1;
            product['options'][optionName].total_product = parseFloat(product['options'][optionName].quantity) * parseFloat(product['options'][optionName].price)
            this.saveCartInCookies()

        },
        decrementoption(product, optionName) {
            if (product['options'][optionName].quantity > 1) {
                product['options'][optionName].quantity -= 1
                product['options'][optionName].total_product = parseFloat(product['options'][optionName].quantity) * parseFloat(product['options'][optionName].price)
            } else {
                delete this.cart_products[product.id]['options'][optionName]
                if (Object.keys(this.cart_products[product.id]['options']).length == 0) {
                    delete this.cart_products[product.id]
                }
            }
            this.saveCartInCookies()
        },

        incrementCounter() {
            this.modalQuantity++
        },
        decrementCounter() {
            if (this.modalQuantity > 1) {
                this.modalQuantity--
            }
        },
    },


    created() {
        const t = useI18n()
        //Cookies Cart
        store.dispatch('checkCart', this.storeId)
        var store_cart = Cookies.get('cart_' + this.storeId)
        if (store_cart !== undefined) {
            var jsoncart = JSON.parse(store_cart)
            if (Object.keys(jsoncart).length !== 0) {
                this.cart_products = jsoncart
            }
        }
        //Store 
        axios
            .get(`/store/${this.storeId}`)
            .then((response) => {
                this.telephone = response.data.telephone
                this.whatsapp = response.data.whatsapp
                this.maps = response.data.maps
                this.allproducts = response.data.products
                this.storename = response.data.storename
                this.logo = response.data.logo
                this.lang = response.data.lang
                //change language
                t.locale.value = response.data.lang
                return { t }

            })
            .catch((err) => { });

    },
};
</script>
<style lang="scss" scoped>
@import "../../scss/variables.scss";

.header {
    margin: auto;
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 20px;
}

.homecontainer-sm {
    margin: auto;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 20px;
}

.homecontainer-lg {
    margin: auto;
    padding-left: 100px;
    padding-right: 100px;
    padding-bottom: 20px;
}

.float {
    position: fixed;
    width: 60px;
    height: 60px;
    bottom: 10px;
    background-color: rgb(37, 211, 102);
    color: #FFF;
    font-size: 35px;
    border-radius: 50px;
    box-shadow: 2px 2px 3px #999;
}

.dialog .h3 {
    font-family: $body-font-family !important;
}

.dialog .h2 {
    font-family: $body-font-family !important;
}

.dialog .text-h5 {
    font-family: $body-font-family !important;
}

.dialog .text-h6 {
    font-family: $body-font-family !important;
}

.dialog .p {
    font-family: $body-font-family !important;
}
</style>