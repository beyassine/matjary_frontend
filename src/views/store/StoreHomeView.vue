<template>
    <div class="header">
        <div class="d-flex justify-center align-center ">
            <div>
                <router-link class="text-decoration-none text-black" :to="{
                    name: 'storehome',
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
        <div class=" d-flex align-center justify-center ma-5">

            <a class="text-decoration-none text-black" target="_blank"
                :href="'https://wa.me/' + telephone.replace(/\s/g, '')">
                <v-btn class="ma-5" variant="text" icon color="">
                    <v-icon size="42">mdi-whatsapp</v-icon>
                </v-btn>
            </a>
            <router-link class="text-decoration-none text-black d-flex justify-center" :to="{
                name: 'storehome',
                params: { storeId: this.storeId }
            }">
                <v-btn  class="ma-5" variant="text"  icon>
                    <v-icon size="43">mdi-home-outline</v-icon>
                </v-btn>
            </router-link>
            <v-btn  class="ma-5" variant="text" icon @click.stop="drawer = !drawer">
                <v-badge color="red" v-if="iscart" dot>
                    <v-icon size="40">mdi-shopping-outline</v-icon>
                </v-badge>

                <v-icon size="40" v-if="!iscart">mdi-shopping-outline</v-icon>
            </v-btn>
        </div>
        <v-divider class="ma-5"></v-divider>
    </div>
    <div :class="$vuetify.display.mdAndUp ? 'homecontainer-lg' : 'homecontainer-sm'">
        <v-row class="d-flex flex-row-reverse ">
            <v-col v-for="(categorie, index) in categories" :key="categories.id"
                :cols="$vuetify.display.mdAndUp ? '4' : '12'">
                <v-card class="mb-1" elevation="1"
                    :to="{ name: 'storecategoriedetail', params: { storeId: storeId, categorieId: categorie.name } }">
                    <div class="d-flex justify-space-between align-center">
                        <div class="text-green ma-5">
                            <h3><v-icon>mdi-chevron-left</v-icon></h3>
                        </div>
                        <div class="d-flex flex-no-wrap align-center justify-end ma-1">
                            <div class="mr-2">
                                <h3 class="text-right">{{ categorie.name }}</h3>
                            </div>
                            <div class="d-flex flex-no-wrap justify-center ma-1">
                                <v-avatar class="ma-1" size="80" rounded="0">
                                    <v-img :src="categorie.image == null || categorie.image == ''
                                        ? imgvoid
                                        : categorie.image"></v-img>
                                </v-avatar>
                            </div>
                        </div>
                    </div>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="d-flex flex-row-reverse ">
            <v-col v-for="(store, index) in storeslist" :key="store.id" :cols="$vuetify.display.mdAndUp ? '4' : '12'">
                <v-card class="mb-1" elevation="1"
                    :to="{ name: 'substoredetail', params: { storeId: storeId, substoreId: store.id } }">
                    <div class="d-flex justify-space-between align-center">
                        <div class="text-green ma-5">
                            <h3><v-icon>mdi-chevron-left</v-icon></h3>
                        </div>
                        <div class="d-flex flex-no-wrap align-center justify-end ma-1">
                            <div class="mr-2">
                                <h3 class="text-right">{{ store.name }}</h3>
                            </div>
                            <div class="d-flex flex-no-wrap justify-center ma-1">
                                <v-avatar class="ma-3" size="80" rounded="0">
                                    <v-img :src="store.logo == null || store.logo == ''
                                        ? imgvoid
                                        : store.logo"></v-img>
                                </v-avatar>
                            </div>
                        </div>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </div>
    <!-- <v-bottom-navigation v-if="showCart" style="height: 70px;" elevation="0">
        <v-icon class="float d-flex justify-center align-center" size="x-large" icon="mdi-shopping-outline"
            @click.stop="drawer = !drawer"></v-icon>
    </v-bottom-navigation> -->
    <v-navigation-drawer v-model="drawer" location="right" style="padding: 10px;" temporary>
        <h3 class="text-center mt-2 mb-5">{{ $t('store.products') }}</h3>
        <v-divider class="mb-5"></v-divider>
        <v-card v-for="(product, index) in cart_products" :key="product.id" class="ma-2 " elevation="0">
            <div
                v-if="Object.keys(this.cart_products[product.id]['options']).length == 0 && this.cart_products[product.id]['addons'].length == 0">
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
                <div class="d-flex flex-no-wrap justify-space-between ma-1 ">
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
                <v-divider></v-divider>
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
            <div v-if="this.cart_products[product.id]['addons'].length > 0">
                <div v-for="addon in product.addons">
                    <div v-if="parseFloat(addon.total_product) > 0">
                        <div class="d-flex flex-no-wrap align-center justify-end ">
                            <div class="d-flex flex-no-wrap align-center justify-end ">
                                <div class="mr-2">
                                    <h3 class="text-right">{{ product.name }}</h3>
                                    <div v-for="key in Object.keys(addon.options)">
                                        <h4 class="">{{ key }} :</h4>
                                        <div v-for="addonkey in Object.keys(addon.options[key]['addons'])">
                                            <h4 v-if="addon.options[key]['addons'][addonkey]['quantity'] > 0"
                                                class="text-left text-grey">
                                                {{ addon.options[key]['addons'][addonkey]['quantity'] }} x {{ addonkey }}
                                            </h4>
                                        </div>
                                    </div>
                                    <h3 class="text-right text-green-darken-1 font-weight-bold mt-2 ml-2">{{
                                        parseFloat(addon.total_product).toFixed(2) }} {{ $t('currency.DH') }}
                                    </h3>
                                </div>
                                <v-avatar class="ma-1" size="50" rounded="0">
                                    <v-img :src="product.img"></v-img>
                                </v-avatar>
                            </div>
                        </div>
                        <div class="d-flex flex-no-wrap justify-space-between ma-2 ">
                            <div class="d-flex justify-space-between">
                                <v-btn class="text-green-darken-1" size="large" variant="text"
                                    @click="decrementcartaddon(addon)">
                                    <h1>-</h1>
                                </v-btn>
                                <h2 class="ma-2">{{ addon.quantity }}</h2>
                                <v-btn class="text-green-darken-1" size="large" variant="text"
                                    @click="incrementcartaddon(addon)">
                                    <h1>+</h1>
                                </v-btn>
                            </div>
                        </div>
                    </div>
                </div>
                <v-divider></v-divider>
            </div>
        </v-card>
        <template v-slot:append>
            <div class="pa-2">
                <v-divider></v-divider>
                <h3 class="ma-3 text-center">{{ parseFloat(total_products).toFixed(2) }} {{ $t('currency.DH') }}</h3>
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
            categories: '',
            storeslist: '',
            selectedCategory: '',
            lang: 'ar',
            // product detail
            dialog: false,
            modalProduct: '',
            modalOption: '',
            modalAddons: {},
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
        total_products: function () {
            let total = 0
            for (const product in this.cart_products) {
                if (Object.keys(this.cart_products[product]['options']).length > 0) {
                    for (const option in this.cart_products[product]['options']) {
                        total += parseFloat(this.cart_products[product]['options'][option]['total_product'])
                    }
                }
                else if (this.cart_products[product]['addons'].length > 0) {
                    for (const addon in this.cart_products[product]['addons']) {
                        total += parseFloat(this.cart_products[product]['addons'][addon]['total_product'])
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
        },
        cartBtn() {
            if (this.modalProduct.addons) {
                return this.modalProduct.addons.every(addon => {
                    if (parseFloat(addon.quantity) == 0) {
                        return true
                    } else {
                        return addon.disabled
                    }
                });

            } else {
                return true
            }
        }
    },

    methods: {
        ...mapActions(["setiscart"]),

        selectImage(index) {
            this.selectedItem = index;
        },

        showProduct(product) {
            this.modalProduct = JSON.parse(JSON.stringify(product));
            this.modalQuantity = 1
            if (product.options && product.options.length > 0) {
                this.modalOption = product.options[0]
            }
            this.modalAddons = {
                options: {},
                total_addons: 0,
                total_product: 0
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
                    addons: [],
                };
            }
            // Check if product has options
            if (this.modalProduct.options && this.modalProduct.options.length > 0) {
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
            } else if (this.modalProduct.addons && this.modalProduct.addons.length > 0) {
                // Check if product has addons
                this.modalAddons['quantity'] = this.modalQuantity
                this.modalAddons['price'] = this.modalProduct.unitprice
                this.modalAddons['total_product'] = parseFloat(this.modalQuantity) * (parseFloat(this.modalProduct.unitprice) + parseFloat(this.modalAddons['total_addons']))
                this.cart_products[this.modalProduct.id]['addons'].push(this.modalAddons)


            } else {
                this.cart_products[this.modalProduct.id]['quantity'] = this.modalQuantity
                this.cart_products[this.modalProduct.id]['price'] = this.modalProduct.unitprice
                this.cart_products[this.modalProduct.id]['total_product'] = parseFloat(this.modalProduct.unitprice) * parseFloat(this.modalQuantity)
            }

            this.saveCartInCookies()
            this.setiscart()
            this.dialog = false
            this.modalQuantity = 1
            this.modalAddons = {}
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
        incrementadddon(addon, option) {
            if (!this.modalAddons['options'][addon.name]) {
                this.modalAddons['options'][addon.name] = {}
                this.modalAddons['options'][addon.name]['addons'] = {}
                this.modalAddons['options'][addon.name]['ordered'] = 0

            }

            if (parseFloat(this.modalAddons['options'][addon.name]['quantity']) > 0 && parseFloat(this.modalAddons['options'][addon.name]['ordered']) >= parseFloat(this.modalAddons['options'][addon.name]['quantity'])) {
                return
            } else {
                if (this.modalAddons['options'][addon.name]['addons'][option.name]) {
                    option.quantity += 1
                    this.modalAddons['options'][addon.name]['addons'][option.name] = {
                        quantity: option.quantity,
                        cost: option.cost,
                        total: parseFloat(option.cost) * parseFloat(option.quantity)
                    }
                    this.modalAddons['options'][addon.name]['quantity'] = addon.quantity
                    this.modalAddons['options'][addon.name]['ordered'] += 1
                    this.modalAddons['total_addons'] += parseFloat(option.cost)
                } else {
                    option.quantity = 1
                    this.modalAddons['options'][addon.name]['addons'][option.name] = {
                        quantity: option.quantity,
                        cost: option.cost,
                        total: parseFloat(option.cost) * parseFloat(option.quantity)
                    }
                    this.modalAddons['options'][addon.name]['quantity'] = addon.quantity
                    this.modalAddons['options'][addon.name]['ordered'] += 1
                    this.modalAddons['total_addons'] += parseFloat(option.cost)
                }
            }
            if (parseFloat(this.modalAddons['options'][addon.name]['quantity']) > 0 && parseFloat(this.modalAddons['options'][addon.name]['ordered']) >= parseFloat(this.modalAddons['options'][addon.name]['quantity'])) {
                addon.disabled = true
            } else {
                addon.disabled = false
            }
        },
        decrementadddon(addon, option) {
            if (option.quantity > 0) {
                option.quantity -= 1
                this.modalAddons['options'][addon.name]['addons'][option.name] = {
                    quantity: option.quantity,
                    cost: option.cost,
                    total: parseFloat(option.cost) * parseFloat(option.quantity)
                }
                this.modalAddons['options'][addon.name]['quantity'] = addon.quantity
                this.modalAddons['options'][addon.name]['ordered'] -= 1
                this.modalAddons['total_addons'] -= parseFloat(option.cost)
            }
            if (parseFloat(this.modalAddons['options'][addon.name]['quantity']) > 0 && parseFloat(this.modalAddons['options'][addon.name]['ordered']) >= parseFloat(this.modalAddons['options'][addon.name]['quantity'])) {
                addon.disabled = true
            } else {
                addon.disabled = false
            }

        },
        incrementcartaddon(addon) {
            addon.quantity += 1;
            addon.total_product = parseFloat(addon.quantity) * (parseFloat(addon.price) + parseFloat(addon.total_addons))
            this.saveCartInCookies()
        },
        decrementcartaddon(addon) {
            if (addon.quantity > 0) {
                addon.quantity -= 1;
                addon.total_product = parseFloat(addon.quantity) * (parseFloat(addon.price) + parseFloat(addon.total_addons))
                this.saveCartInCookies()
            }
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
                this.categories = response.data.categories
                this.storeslist = response.data.storeslist
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

.btn-float {
    position: fixed;
    align-self: center;
    width: 240px;
    height: 60px;
    bottom: 10px;
    background-color: rgb(37, 211, 102);
    color: #FFF;
    font-size: 35px;
    border-radius: 50px;
    box-shadow: 1px 1px 2px #999;
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