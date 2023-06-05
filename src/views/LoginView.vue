<template>
  <v-img class="mx-auto outlined" :width="150" :src="logo" cover></v-img>
  <div class="d-flex justify-center">
    <v-form :class="$vuetify.display.smAndUp ? 'signupFormLg' : 'signupFormSm'" v-model="valid">
      <div class="text-right align-center">
        <h3 class="mb-3">رقم الهاتف</h3>
        <vue-tel-input class="tel-input" v-model="phone" v-bind="bindProps" @validate="check"></vue-tel-input>
        <h5 v-if="telerror" class="text-red">{{ telmsgerror }}</h5>
        <h3 class="mb-3 mt-3">كلمة المرور</h3>
        <v-text-field :prepend-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
          outlined v-model="password" :rules="passwordRules"
          @click:prepend-inner="visible = !visible"></v-text-field>
      </div>
      <v-btn :disabled="!valid" :loading="loading" class="mt-5 text-white" color="light-green" size="large" block dark
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
import majary_logo from "../assets/matjary_logo_g.png";

import { mapGetters, mapActions } from "vuex";
import { useDisplay } from "vuetify";

import BtnXlg from "@/components/BtnXlg";

export default {
  setup() {
    const { display } = useDisplay();
  },

  components: {
    BtnXlg,
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
    emailRules: [
      (v) => !!v || "أدخل عنوان البريد الإلكتروني",
      (v) => /.+@.+\..+/.test(v) || "عنوان البريد الإلكتروني غير صحيح",
    ],
    passwordRules: [(v) => !!v || "أدخل كلمة المرور"],

    //
    loading: false,
    required: [(v) => !!v || "لا يجوز أن يُترَك هذا الحقل فارغًا"],
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
    isvalildtel:false,
    validatetel:'',
    telerror: false,
    telmsgerror: '',
  }),

  computed: {
    ...mapGetters(["getUser", "getUserRole"]),
    vaidform() {
      if (this.isvalildtel && this.valid) {
        return true
      }
      return false
    },
  },

  methods: {
    ...mapActions(["loginUser"]),
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
    submitForm() {
      this.loading = true;
      const fd = {
        phone: this.validatetel,
        password: this.password
      };
      this.loginUser(fd)
        .then(() => {
          this.loading = false;
          if (this.getUserRole == 'seller') {
            this.$router.push({
              name: "products",
            })
          }
          if (this.getUserRole == 'provider') {
            this.$router.push({
              name: "adminproducts",
            });
          }

          return;
        })
        .catch((err) => {
          this.incorrectAuth = true;
          this.loading = false;
        });
    },
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