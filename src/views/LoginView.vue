<template>
  <ExtendHeader bordered="false" />
  <div class="bg-white d-flex justify-center">
    <v-form :class="$vuetify.display.smAndUp ? 'signupFormLg' : 'signupFormSm'" v-model="valid">
      <div class="mt-5 text-right align-center">
        <h2 class="text-center mb-2">تسجيل الدخول</h2>
        <h3 class="mb-3">رقم الهاتف</h3>
        <vue-tel-input class="tel-input" v-model="phone" v-bind="bindProps"
          @country-changed="countryChanged"></vue-tel-input>
        <h5 v-if="telerror" class="text-red">{{ telmsgerror }}</h5>
        <h3 class="mb-3 mt-3">كلمة المرور</h3>
        <v-text-field :prepend-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
          outlined v-model="password" :rules="passwordRules" @click:prepend-inner="visible = !visible"></v-text-field>
      </div>
      <v-btn :disabled="!vaidform" :loading="loading" class="mt-5 text-white" color="light-green" size="large" block dark
        @click="submitForm()">
        <h3>تابع</h3>
      </v-btn>
      <h5 v-if="incorrectAuth" class="text-right text-red mt-2">
        رقم الهاتف أو كلمة المرور خاطئ
      </h5>
      <h4 class="text-center mt-5">
        <router-link class="text-decoration-none" to="Signup">
          <v-btn class="text-light-green" variant="flat">
            <h3>أنشئ متجرك</h3>
          </v-btn>
        </router-link>
        ليس لديك حساب ؟
      </h4>
    </v-form>
  </div>
</template>

<script>
import parsePhoneNumber from 'libphonenumber-js'
import axios from "axios";

import majary_logo from "../assets/matjary_logo_g.png";

import { mapGetters, mapActions } from "vuex";
import { useDisplay } from "vuetify";

import ExtendHeader from "../components/ExtendHeader";

export default {
  setup() {
    const { display } = useDisplay();
  },

  components: {
    ExtendHeader
  },

  data: () => ({
    logo: majary_logo,
    valid: false,
    loading: false,
    phone: "",

    password: "",
    visible: false,
    incorrectAuth: false,
    // Rules
    passwordRules: [(v) => !!v || "أدخل كلمة المرور"],

    //
    countryCode: '',
    loading: false,
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
    isvalildtel: false,
    validatetel: '',
    telerror: false,
    telmsgerror: '',
  }),

  computed: {
    ...mapGetters(["getUser", "getUserRole"]),
    vaidform() {
      if (this.valid && this.phone !== '') {
        return true
      }
      return false
    },
  },

  methods: {
    ...mapActions(["loginUser"]),
    countryChanged(country) {
      this.countryCode = country.iso2
    },
    getPhone() {
      var phoneNumber = parsePhoneNumber(this.phone, this.countryCode)
      this.validatetel = phoneNumber.number;
    },
    submitForm() {
      this.loading = true;
      this.getPhone()
      const fd = {
        phone: this.validatetel,
        password: this.password
      };
      this.loginUser(fd)
        .then(() => {
          this.loading = false;
          this.$router.push({
            name: "adminorders",
          })
        })
        .catch((err) => {
          this.incorrectAuth = true;
          this.loading = false;
        });
    },
  },
  created() {
    axios.get('https://ip2c.org/s').then((response) => {
      this.countryCode = response.data.split(';')[1]
    })
  },
};
</script>

<style lang="scss" scoped>
.signupFormLg {
  margin: auto;
  width: 40%;
  padding: 10px;
}

.signupFormSm {
  margin: auto;
  width: 90%;
  padding: 10px;
}

.tel-input {
  height: 55px;
  background-color: rgb(235, 235, 235);
  border-bottom: 1px solid grey;
  border-top: 1px solid rgb(235, 235, 235);
  border-left: 1px solid rgb(235, 235, 235);
  border-right: 1px solid rgb(235, 235, 235);
}
</style>