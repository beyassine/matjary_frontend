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
                <v-icon class="mb-1" color="grey-darken-3" icon="mdi-phone-in-talk-outline" size="35"></v-icon>
            </div>
            <div class="text-center ma-3 pa-3">
                <v-icon class="mb-1" color="grey-darken-3" icon="mdi-whatsapp" size="35"></v-icon>
            </div>
            <div class="text-center ma-3 pa-3">
                <v-icon class="mb-1" color="grey-darken-3" icon="mdi-map-marker-radius-outline" size="35"></v-icon>
            </div>
        </div>
    </div>

    <v-divider class="mb-5"></v-divider>

    <div :class="$vuetify.display.smAndUp ? 'homecontainer-lg bg-white' : 'homecontainer-sm bg-white'">
        <h1 class="text-center mb-5">Mon Panier</h1>
        <v-row class="d-flex flex-row-reverse mt-3">
            <v-col class="bg-grey-lighten-2 mb-5" :cols="$vuetify.display.smAndUp ? '6' : '12'">
                <h2 class="text-left text-green-darken-1 mb-3"> Produits</h2>
                <h2 v-if="products.length == 0" class="text-center">Aucun Produit</h2>
                <v-card v-for="(product, index) in products" :key="product.id" class="ma-2 " elevation="0">
                    <div
                        v-if="Object.keys(this.products[product.id]['options']).length == 0 && this.products[product.id]['addons'].length == 0">
                        <div class="d-flex flex-no-wrap align-center justify-end ">
                            <div class="d-flex flex-no-wrap align-center justify-end ">
                                <div class="mr-2">
                                    <h3 class="text-left">{{ product.name }}</h3>
                                </div>
                                <v-avatar class="ma-1" size="50" rounded="0">
                                    <v-img :src="product.img"></v-img>
                                </v-avatar>
                            </div>
                        </div>
                        <div class="d-flex flex-no-wrap justify-space-between ma-2 ">
                            <h2 class="text-left text-green-darken-1 font-weight-bold mt-2 ml-2">
                                {{ parseFloat(product.total_product).toFixed(2) }} DH
                            </h2>
                            <div class="d-flex justify-space-between">
                                <v-btn size="large" variant="text" @click="decrement(product)">
                                    <h1 class="text-green-darken-1">-</h1>
                                </v-btn>
                                <h2 class="ma-2">{{ product.quantity }}</h2>
                                <v-btn class="text-green-darken-1" size="large" variant="text" @click="increment(product)">
                                    <h1>+</h1>
                                </v-btn>
                            </div>
                        </div>
                    </div>
                    <div v-if="Object.keys(this.products[product.id]['options']).length > 0">
                        <div v-for="option in product.options">
                            <div class="d-flex flex-no-wrap align-center justify-end ">
                                <div class="d-flex flex-no-wrap align-center justify-end ">
                                    <div class="mr-2">
                                        <h3 class="text-left">{{ product.name }}</h3>
                                        <h4 class="text-left text-grey">{{ option.name }}</h4>
                                    </div>
                                    <v-avatar class="ma-1" size="50" rounded="0">
                                        <v-img :src="product.img"></v-img>
                                    </v-avatar>
                                </div>
                            </div>
                            <div class="d-flex flex-no-wrap justify-space-between ma-2 ">
                                <h2 class="text-left text-green-darken-1 font-weight-bold mt-2 ml-2">
                                    {{ parseFloat(option.total_product).toFixed(2) }} DH
                                </h2>
                                <div class="d-flex justify-space-between">
                                    <v-btn size="large" variant="text" @click="decrementoption(product, option.name)">
                                        <h1 class="text-green-darken-1">-</h1>
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
                    <div v-if="this.products[product.id]['addons'].length > 0">
                        <div v-for="addon in product.addons">
                            <div v-if="parseFloat(addon.total_product) > 0">
                                <div class="d-flex flex-no-wrap align-center justify-end ">
                                    <div class="d-flex flex-no-wrap align-center justify-end ">
                                        <div class="mr-2">
                                            <h3 class="text-left">{{ product.name }}</h3>
                                        </div>
                                        <v-avatar class="ma-1" size="50" rounded="0">
                                            <v-img :src="product.img"></v-img>
                                        </v-avatar>
                                    </div>
                                </div>
                                <div class="d-flex align-center justify-space-between ma-5">
                                    <div class="mr-2 ">
                                        <div class="" v-for="key in Object.keys(addon.options)">
                                            <h4 class="">{{ key }} :</h4>
                                            <div v-for="addonkey in Object.keys(addon.options[key]['addons'])">
                                                <h4 v-if="addon.options[key]['addons'][addonkey]['quantity'] > 0"
                                                    class="text-left text-grey">
                                                    {{ addon.options[key]['addons'][addonkey]['quantity'] }} x {{
                                                        addonkey }}
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex flex-no-wrap justify-space-between ma-2 ">
                                    <h2 class="text-left text-green-darken-1 font-weight-bold mt-2 ml-2">
                                        {{ parseFloat(addon.total_product).toFixed(2) }} DH
                                    </h2>
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
            </v-col>
            <v-col :cols="$vuetify.display.mdAndUp ? '6' : '12'">
                <v-form v-model="valid">
                    <h2 class="text-left text-green-darken-1 mb-5">Livraison</h2>
                    <v-container fluid>
                        <v-radio-group class="d-flex justify-start" color="green" v-model="shippingoption">
                            <v-radio v-if="this.pickup" value="pickup">
                                <template v-slot:label>
                                    <div class="text-h6 text-left">A emporter:<strong>Grauit
                                        </strong></div>
                                </template>
                            </v-radio>
                            <v-radio v-if="this.shipping" value="delivery">
                                <template v-slot:label>
                                    <div class="text-h6 text-left">Livraison :<strong class=""> {{
                                        shipcost }} DH
                                        </strong></div>
                                </template>
                            </v-radio>
                        </v-radio-group>
                    </v-container>
                    <h2 class="text-left text-green-darken-1 mt-5 mb-5">Informations Client</h2>
                    <v-card-item class="mt-3">
                        <div class="text-left align-center">
                            <h3 class="mb-3"><v-icon class="mr-2">mdi-pencil-outline</v-icon>Nom Complet</h3>
                            <v-text-field outlined type="text" v-model="fullname" :readonly="loading" dense></v-text-field>
                        </div>
                    </v-card-item>
                    <v-card-item>
                        <div class="text-left align-center">
                            <div style="padding-bottom: 100px;">
                                <h3 class="mb-3"><v-icon class="mr-2">mdi-phone-outline</v-icon> Numéro Téléphone *
                                </h3>
                                <vue-tel-input class="tel-input" v-model="phone" v-bind="bindProps"
                                    @country-changed="countryChanged"></vue-tel-input>
                                <h5 v-if="telerror" class="text-red">{{ telmsgerror }}</h5>
                            </div>
                        </div>
                    </v-card-item>
                    <v-divider class="mb-3"></v-divider>
                    <div class="d-flex justify-space-between ma-5">
                        <h3 class="text-left">
                            Total Produits :
                        </h3>
                        <h3 class="text-left">
                            {{ total_products.toFixed(2) }} DH
                        </h3>
                    </div>
                    <div v-if="this.shippingoption == 'delivery'" class="d-flex justify-space-between ma-5">
                        <h3 class="text-left">
                            Prix Livraison :
                        </h3>
                        <h3 class="text-left">
                            {{ total_shipping.toFixed(2) }} DH
                        </h3>
                    </div>
                    <v-divider class="mb-3"></v-divider>
                    <div class="d-flex justify-space-between ma-5">
                        <h2 class="text-left">
                            Prix Total :
                        </h2>
                        <h2 class="text-left">
                            {{ total_order.toFixed(2) }} DH
                        </h2>
                    </div>
                    <v-card-actions class="mb-5">
                        <v-btn block color="green-darken-1" size="large" variant="elevated" class="text-h6 text-white mt-5"
                            @click="addOrder" :disabled="validform" :loading="loading">
                            Commander
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-col>
        </v-row>
    </div>
    <v-dialog class="dialog" v-model="dialog" width="90%">
        <v-card class="text-center d-flex justify-center">
            <v-card-text class="mb-2">
                <h2><v-icon color="green">mdi-check-circle-outline</v-icon></h2>
                <h3>Commande ajoutée avec succés</h3>
            </v-card-text>
            <a ref="whatsappbtn" :href="whatsapplink" target="_blank" class="text-decoration-none ma-3">
                <v-btn block color="green-lighten-1" size="large" variant="elevated" class="text-h6 text-white">
                    Envoyer par Whatsapp
                    <v-icon class="ml-2">mdi-whatsapp</v-icon>
                </v-btn>
            </a>
        </v-card>
    </v-dialog>
</template>
  
<script>
import axios from "axios";
import Cookies from 'js-cookie'

import parsePhoneNumber from 'libphonenumber-js'
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
            orderId: '',
            src1: imagevoid,
            src2: storevoid,
            storename: '',
            logo: '',
            whatsapp: '',
            telephone: '',
            maps: '',
            pickup: true,
            shipping: true,
            shipcost: '',
            products: '',
            cart: '',
            // coordinates form
            valid: false,
            loading: false,
            required: [(v) => !!v || "Merci de renseigner ce champs"],
            fullname: "",
            phone: '',
            shippingoption: 'delivery',
            //vue-tel-input
            countryCode: '',
            telerror: false,
            telmsgerror: '',
            validatetel: "",
            isvalildtel: false,
            bindProps: {
                mode: "international",
                autoFormat: false,
                disabledFetchingCountry: false,
                disabled: false,
                disabledFormatting: false,
                required: false,
                enabledCountryCode: true,
                enabledFlags: true,
                preferredCountries: ['MA', 'DZ', 'BH', 'EG', 'KW', 'LB', 'LY', 'OM', 'QA', 'SA', 'TN', 'AE', 'YE', 'SY', 'IQ', 'JO', 'SD', 'MR', 'PS'],
                onlyCountries: [],
                ignoredCountries: [],
                autocomplete: "off",
                name: "phone",
                maxLen: 25,
                wrapperClasses: "",
                inputClasses: "",
                dropdownOptions: {
                    disabledDialCode: false,
                    showDialCodeInList: true,
                    showDialCodeInSelection: true,
                    showFlags: true,
                },
                inputOptions: {
                    showDialCode: false,
                },
            },
            //dialog
            dialog: false,
        };
    },

    computed: {
        ...mapGetters(["iscart", "getUserRole"]),

        total_products: function () {
            let total = 0
            for (const product in this.products) {
                if (Object.keys(this.products[product]['options']).length > 0) {
                    for (const option in this.products[product]['options']) {
                        total += parseFloat(this.products[product]['options'][option]['total_product'])
                    }
                }
                else if (this.products[product]['addons'].length > 0) {
                    for (const addon in this.products[product]['addons']) {
                        total += parseFloat(this.products[product]['addons'][addon]['total_product'])
                    }
                }
                else {
                    total += parseFloat(this.products[product]['total_product'])
                }
            }
            return total
        },
        total_shipping() {
            if (this.shippingoption == 'delivery') {
                return parseFloat(this.shipcost)
            } else {
                return 0
            }
        },
        total_order() {
            return this.total_products + parseFloat(this.total_shipping)
        },
        validform() {
            if (this.phone !== '' && this.valid) {
                return false
            }
            return true
        },
        whatsapplink() {
            let link = 'https://wa.me/' + this.whatsapp.replace(/\s/g, '') + "?text="
            for (const product in this.products) {

                if (Object.keys(this.products[product]['options']).length == 0 && this.products[product]['addons'].length == 0) {
                    link += this.products[product]['quantity'] + ' x ' + this.products[product]['name'] + "%0a"
                }

                // options
                if (Object.keys(this.products[product]['options']).length > 0) {
                    for (const option in this.products[product]['options']) {
                        link += this.products[product]['options'][option]['quantity'] + ' x ' + this.products[product]['name'] + ' - ' + this.products[product]['options'][option]['name'] + "%0a"
                    }
                }

                //addons
                if (this.products[product]['addons'].length > 0) {
                    for (const addon in this.products[product]['addons']) {
                        link += this.products[product]['addons'][addon]['quantity'] + ' x ' + this.products[product]['name'] + "%0a"
                        for (const option in this.products[product]['addons'][addon]['options']) {
                            link += '- ' + option + ':' + "%0a"
                            for (const addonkey in this.products[product]['addons'][addon]['options'][option]['addons']) {
                                if (parseFloat(this.products[product]['addons'][addon]['options'][option]['addons'][addonkey]['quantity']) > 0) {
                                    link += '-- ' + this.products[product]['addons'][addon]['options'][option]['addons'][addonkey]['quantity'] + ' x ' + addonkey + "%0a"
                                }

                            }

                        }
                    }
                }
            }

            if (this.shippingoption == 'pickup') {
                link += 'A emporter' + "%0a"
            } else {
                link += 'Livraison' + "%0a"
            }
            link += 'Total' + ": " + this.total_order + ' DH' + "%0a"

            link += "%0a" + 'https://www.matjary.app/orders/' + this.orderId

            return link
        },
        productList() {
            var cartProducts = JSON.parse(JSON.stringify(Object.values(this.products)));

            for (const product in cartProducts) {
                if (Object.keys(cartProducts[product]['options']).length > 0) {
                    let options = []
                    options = Object.values(cartProducts[product]['options'])
                    cartProducts[product]['options'] = options
                }
                else {
                    cartProducts[product]['options'] = []
                }
                //stringify addons
                if (cartProducts[product]['addons'].length > 0) {
                    cartProducts[product]['addons'] = JSON.stringify(cartProducts[product]['addons'])
                } else {
                    cartProducts[product]['addons'] = ''
                }
            }

            return cartProducts
        },

    },

    methods: {
        ...mapActions(["setiscart"]),

        countryChanged(country) {
            this.countryCode = country.iso2
        },
        getPhone() {
            var phoneNumber = parsePhoneNumber(this.phone, this.countryCode)
            this.validatetel = phoneNumber.number;
        },

        saveCartInCookies() {
            Cookies.set(("cart_" + this.storeId), JSON.stringify(this.products))
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
                delete this.products[product.id]
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
                delete this.products[product.id]['options'][optionName]
                if (Object.keys(this.products[product.id]['options']).length == 0) {
                    delete this.products[product.id]
                }
            }
            this.saveCartInCookies()
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
        removeproduct(product) {
            delete this.products[product.id]
            Cookies.set(("cart_" + this.storeId), JSON.stringify(this.products))
        },
        addOrder() {
            this.loading = true
            this.getPhone()
            const fd = {
                user_id: this.storeId,
                products: this.productList,
                phone: this.validatetel,
                clientname: this.fullname,
                shippingoption: this.shippingoption,
                orderstatus: 'enregistred',
                shipcost: this.total_shipping,
                total_products: this.total_products,
                total_order: this.total_order,
            }
            axios
                .post(`/order/create`, fd)
                .then((response) => {
                    if (response.status === 200) {
                        console.log(this.whatsapplink)
                        Cookies.set(("cart_" + this.storeId), JSON.stringify({}))
                        this.orderId = response.data.id
                        this.dialog = true
                        this.loading = false
                    }
                });
        }
    },

    created() {
        this.storePhone = this.getstorePhone;
        axios.get('https://ip2c.org/s').then((response) => {
            this.countryCode = response.data.split(';')[1]
        })
        axios
            .get(`/store/${this.storeId}`)
            .then((response) => {
                this.storename = response.data.storename
                this.logo = response.data.logo
                this.shipping = response.data.shipping
                this.shipcost = response.data.shipcost
                this.pickup = response.data.pickup
                this.whatsapp = response.data.whatsapp
            })
            .catch((err) => { });

        //Cookies Cart
        var cart = Cookies.get('cart_' + this.storeId)
        if (cart !== undefined) {
            var jsoncart = JSON.parse(cart)
            if (Object.keys(jsoncart).length !== 0) {
                this.products = jsoncart
            }
        }
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
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
}

.homecontainer-lg {
    margin: auto;
    padding-left: 70px;
    padding-right: 70px;
    padding-bottom: 20px;
}

.tel-input {
    height: 55px;
    background-color: rgb(246, 246, 246);
    border-bottom: 1px solid grey;
    border-top: 1px solid rgb(235, 235, 235);
    border-left: 1px solid rgb(235, 235, 235);
    border-right: 1px solid rgb(235, 235, 235);
}

.text-h6 {
    font-family: $body-font-family !important;
}
</style>