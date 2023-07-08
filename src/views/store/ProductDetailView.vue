<template>
  <ExtendHeader bordered="true" />
  <div class="container ">
    <v-row class="d-flex flex-row-reverse bg-white">
      <v-col :cols="$vuetify.display.mdAndUp ? '6' : '12'">
        <v-card-text class="text-right">
          <v-row align="center" class="spacer" no-gutters>
            <v-col cols="10">
              <h4 class="mr-2 text-medium-emphasis">{{ this.product.publisher }}</h4>
            </v-col>
            <v-col cols="2">
              <v-avatar size="60">
                <v-img :src="this.product.publisher_logo == null || this.product.publisher_logo == ''
                  ? src1
                  : this.product.publisher_logo
                  "></v-img>
              </v-avatar>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider class="mb-3 "></v-divider>
        <v-row>
          <v-col cols="12">
            <v-img height="350px" :src="bigImage" />
          </v-col>
          <div>

          </div>
          <v-col cols="3" v-for="(image, index) in filteredImages" :key="index">
            <v-img v-if="image !== ''" height="80px" :src="image" @click="selectImage(index)" />
          </v-col>
        </v-row>
        <v-card-text class="text-right">
          <h2 class="mt-3 ">{{ product.productname }}</h2>
          <h1 class=" mt-3">{{ product.unitprice }} <span class="text-h5">د.م </span></h1>
          <p class="text-black mt-3" v-if="product.freeshipping">
            شحن مجاني <v-icon class="ml-2" icon="mdi-truck-outline"></v-icon>
          </p>
        </v-card-text>
        <v-card-text class="text-right">
          <p>{{ product.description }}</p>
        </v-card-text>

        <v-divider></v-divider>
      </v-col>
      <v-col class="bg-white" :cols="$vuetify.display.mdAndUp ? '6' : '12'">
        <v-card-title class="mb-3">
          <h3 class="text-right text-green">أضف طلبك</h3>
        </v-card-title>
        <v-form v-model="valid">
          <v-card-item class="mt-3">
            <div class="text-right align-center">
              <h3 class="mb-3">الإسم الكامل<v-icon class="ml-2">mdi-pencil-outline</v-icon></h3>
              <v-text-field outlined type="text" v-model="fullname" :readonly="loading" dense></v-text-field>
            </div>
          </v-card-item>
          <v-card-item>
            <div class="text-right align-center">
              <h3 class="mb-3">* الكمية المطلوبة <v-icon class="ml-2">mdi-layers-outline</v-icon></h3>
              <v-row class="d-flex justify-space-between  mt-2">
                <v-col cols="4"><v-btn size="x-large" variant="text" @click="decrement">
                    <h2>-</h2>
                  </v-btn></v-col>
                <v-col cols="4"><v-text-field outlined type="number" reverse v-model="quantity" :readonly="loading"
                    dense></v-text-field></v-col>
                <v-col cols="4"><v-btn size="x-large" variant="text" @click="increment">
                    <h2>+</h2>
                  </v-btn></v-col>
              </v-row>
            </div>
          </v-card-item>
          <v-card-item>
            <div class="text-right align-center">
              <div>
                <h3 class="mb-3"> * رقم الواتساب<v-icon class="ml-2 text-green">mdi-whatsapp</v-icon>
                </h3>
                <vue-tel-input class="tel-input" v-model="phone" v-bind="bindProps"
                  @country-changed="countryChanged"></vue-tel-input>
                <h5 v-if="telerror" class="text-red">{{ telmsgerror }}</h5>
              </div>
            </div>
          </v-card-item>
          <v-card-item>
            <div class="text-right align-center mt-2">
              <h3 class="mb-3">* المدينة<v-icon class="ml-2">mdi-map-marker-outline</v-icon></h3>
              <v-select outlined v-model="selectedcity" :items="cities" item-title="city" item-value="cost"
                :rules="required" return-object></v-select>
            </div>
          </v-card-item>
          <v-card-title class="text-right">
            <v-divider class="mb-3"></v-divider>
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
            <v-btn block color="green-darken-1" size="large" variant="elevated" class="mt-5" @click="addOrder"
              :disabled="validform" :loading="loading">
              <h4>أطلب عبر واتساب</h4>
              <v-icon class="ml-2">mdi-whatsapp</v-icon>
            </v-btn>
          </v-card-actions>
          <a ref="whatsappbtn" :href="whatsapplink" class="d-none">
            <v-btn block color="green-lighten-1" size="large" variant="elevated" class="mt-5">
              <h4 class="btn-title">إبعث طلبك عبر الواتساب</h4>
              <v-icon class="ml-2">mdi-whatsapp</v-icon>
            </v-btn>
          </a>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>
  
<script>

import parsePhoneNumber from 'libphonenumber-js'
import axios from "axios";

import { mapGetters } from "vuex";
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
      storeId: '',
      storePhone: '',
      productId: this.$route.params.productId,
      src1: imagevoid,
      src2: storevoid,
      product: "",
      images: '',
      filteredImages: '',
      selectedItem: 0,
      freeshipping: false,
      // coordinates form
      valid: false,
      loading: false,
      required: [(v) => !!v || "لا يجوز أن يُترَك هذا الحقل فارغًا"],
      quantity: 1,
      fullname: "",
      phone: '',
      selectedcity: "",
      cities: '',
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
    ...mapGetters(["getstorePhone"]),

    filtereImagesbyValue() {
      return this.images.filter(url => url !== '');
    },
    bigImage() {
      return this.filteredImages[this.selectedItem];
    },
    total_products: function () {
      return parseFloat(this.quantity) * parseFloat(this.product.unitprice);
    },
    shipcost: function () {
      if (this.selectedcity == '') {
        return 0
      }

      if (this.product.freeshipping) {
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
    },
    validform() {
      if (this.phone !== '' && this.valid) {
        return false
      }
      return true
    },
    whatsapplink() {
      return `https://wa.me/` + this.storePhone + "?text=" + "مرحبًا، قمت بطلب " + ":" + "%0a" + this.product.productname + "%20" + this.quantity + "%0a" + "المدينة" + "%20" + this.shipcity  + "%0a" + "شكرا"
    },
  },

  methods: {
    countryChanged(country) {
      this.countryCode = country.iso2
    },
    getPhone() {
      var phoneNumber = parsePhoneNumber(this.phone, this.countryCode)
      this.validatetel = phoneNumber.number;
    },
    selectImage(index) {
      this.selectedItem = index;
    },
    increment() {
      this.quantity++;
    },
    decrement() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    // submit Form
    addOrder() {
      this.loading = true
      this.getPhone()
      const fd = {
        user_id: this.storeId,
        products: { id: this.productId, img: this.images[0], name: this.product.productname, price: this.product.unitprice, quantity: this.quantity, total_product: this.total_products },
        phone: this.validatetel,
        clientname: this.fullname,
        shipcity: this.shipcity,
        shipcost: this.shipcost,
        total_products: this.total_products,
        total_order: this.total_order,
        orderstatus: 'enregistred'
      }
      axios
        .post(`/order/create`, fd)
        .then((response) => {
          if (response.status === 200) {
            this.$refs.whatsappbtn.click();
            this.loading = false
          }
        });

    },
  },
  created() {
    this.storePhone = this.getstorePhone;
    axios.get('https://ip2c.org/s').then((response) => {
      this.countryCode = response.data.split(';')[1]
    })
    axios
      .get(`/product/get/${this.productId}`)
      .then((response) => {
        this.product = response.data
        this.storeId = response.data.store_id
        this.images = response.data.images
        this.filteredImages = this.filtereImagesbyValue
        this.cities = response.data.shipping
      })
      .catch((err) => { });
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/variables.scss";

.dialog {
  font-family: $body-font-family;
}

.tel-input {
  height: 55px;
  background-color: rgb(246, 246, 246);
  border-bottom: 1px solid grey;
  border-top: 1px solid rgb(235, 235, 235);
  border-left: 1px solid rgb(235, 235, 235);
  border-right: 1px solid rgb(235, 235, 235);
}
.btn-title {
  letter-spacing: -1px;
}
</style>