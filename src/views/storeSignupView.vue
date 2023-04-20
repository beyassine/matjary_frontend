<template>
  <v-img class="mx-auto outlined" :width="150" :src="logo" cover></v-img>
  <div class="d-flex justify-center">
    <form
      :class="$vuetify.display.mdAndUp ? 'signupFormLg' : 'signupFormSm'"
      action=""
    >
      <div class="text-right align-center">
        <h2 class="text-center mb-4">أنشئ حسابك</h2>
        <h3 class="mb-3">رقم واتساب</h3>
        <div>
          <vue-tel-input
            class=""
            v-model="whatsapp"
            v-bind="bindProps"
            @validate="check"
          ></vue-tel-input>
          <h5 v-if="telerror" class="text-red">{{ telmsgerror }}</h5>
        </div>
        <h3 class="mb-3 mt-3">إسم المتجر</h3>
        <input
          type="text"
          class="input"
          placeholder=""
          v-model="storename"
          @change="constructUrl()"
        />
        <h5 v-if="nameerror" class="text-red">{{ msgerror }}</h5>
        <h3 class="mb-3 mt-3">رابط المتجر</h3>
        <div class="d-flex justify-end">
          <h3 class="mt-1">matjary.app /</h3>
          <input
            type="text"
            class="input1 ml-1"
            placeholder=""
            v-model="storeurl"
          />
        </div>
        <h5 v-if="urlerror" class="text-red">{{ msgerror }}</h5>
      </div>
      <v-btn
        :loading="loading"
        class="mt-5 text-white"
        color="light-green"
        size="large"
        block
        dark
        @click="submitForm()"
      >
        <h3>أنشئ</h3>
      </v-btn>
      <h4  class="text-center mt-5">
        <router-link
        class="text-decoration-none"
        to="login"
      >
        <v-btn class="text-light-green" variant="flat">
         <h3>تسجيل الدخول</h3>
        </v-btn>  
        </router-link>      
         لديك حساب ؟ 
      </h4>
    </form>
  </div>
</template>

<script>
import majary_logo from "../assets/matjary_logo_g.png";

import { useDisplay } from "vuetify";

import axios from "axios";
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
    valid: true,
    loading: false,
    whatsapp: "",
    validatetel: "",
    isvalildtel: false,
    show: false,
    storename: "",
    storeurl: "",
    // Rules
    telerror: false,
    telmsgerror: "",
    nameerror: false,
    urlerror: false,
    msgerror: "",
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
      onlyCountries: [],
      ignoredCountries: [],
      autocomplete: "off",
      name: "whatsapp",
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
    arabic: /[\u0600-\u06FF]/,
    translation: {
      ا: "a",
      ب: "b",
      ت: "t",
      ث: "t",
      ج: "j",
      ح: "h",
      خ: "kh",
      د: "d",
      ذ: "d",
      ر: "r",
      ز: "z",
      س: "s",
      ش: "sh",
      ص: "s",
      ض: "d",
      ط: "t",
      ظ: "t",
      ع: "a",
      غ: "gh",
      ف: "f",
      ق: "q",
      ك: "k",
      ل: "l",
      م: "m",
      ن: "n",
      ه: "h",
      و: "w",
      ي: "y",
      ء: "a",
      آ: "a",
      ٱ: "a",
      أ: "a",
      إ: "i",
      ة: "",
      ؤ: "o",
      ئ: "y",
      ى: "a",
      "٠": "0",
      "١": "1",
      "٢": "2",
      "٣": "3",
      "٤": "4",
      "٥": "5",
      "٦": "6",
      "٧": "7",
      "٨": "8",
      "٩": "9",
    },
  }),

  methods: {
    check(telnumber) {
      if (telnumber.valid) {
        this.isvalildtel = true;
        this.validatetel = telnumber.number;
      } else {
        this.isvalildtel = false;
        this.validatetel = "";
      }
    },
    constructUrl() {
      var constructedUrl = "";
      var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      let arr = Array.from(this.storename);
      for (let i = 0; i < arr.length; i++) {
        if (!format.test(arr[i])) {
          if (this.arabic.test(arr[i])) {
            constructedUrl += this.translation[arr[i]];
          } else {
            constructedUrl += arr[i];
          }
        }
      }
      this.storeurl = constructedUrl.toLowerCase();
    },
    submitForm() {
      var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;      
      this.loading = true;
      this.telerror = false;
      this.nameerror = false;
      this.urlerror = false;
      if (this.whatsapp == "") {
        this.telerror = true;
        this.telmsgerror = "لا يجوز أن يُترَك هذا الحقل فارغًا";
        this.loading = false;
        return;
      }
      if (this.isvalildtel == false) {
        this.telerror = true;
        this.telmsgerror = "رقم الهاتف غير صحيح";
        this.loading = false;
        return;
      }
      if (this.storename == "") {
        this.nameerror = true;
        this.msgerror = "لا يجوز أن يُترَك هذا الحقل فارغًا";
        this.loading = false;
        return;
      }
      if (this.storeurl == "") {
        this.urlerror = true;
        this.msgerror = "لا يجوز أن يُترَك هذا الحقل فارغًا";
        this.loading = false;
        return;
      }
      if (format.test(this.storeurl)) {
        this.urlerror = true;
        this.msgerror = "رابط غير صحيح، لا يجوز إستعمال المساحات أو الأحرف الخاصة";
        this.loading = false;
        return;
      }
      const fd = {
        username: this.validatetel,
        storename: this.storename,
        store_id: this.storeurl.replace(/[^a-zA-Z0-9]/g, '').toLowerCase(),
      };
      axios
        .post(`/user/create`, fd)
        .then((response) => {
          if (response.status == 200) {
            this.loading = false;
          }
        })
        .catch((error) => {
          if (error.response) {
            if(error.response.data=='invalid_username'){
          this.loading=false;
          this.telerror = true;
          this.telmsgerror = "رقم الهاتف مستعمل، المرجو تغيير هذا الرقم";
          return;
          }
          if(error.response.data=='invalid_url'){
          this.loading=false;
          this.urlerror = true;
          this.msgerror = "هذا الرابط مستعمل، المرجو تغييره";
          return;
          }
        }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.signupFormLg {
  margin: auto;
  width: 35%;
  padding: 10px;
}
.signupFormSm {
  margin: auto;
  width: 90%;
  padding: 10px;
}
.input {
  border: 1px solid rgb(168, 168, 168);
  border-radius: 3px;
  width: 100%;
  height: 35px;
  padding: 10px;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */
}
.input:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(81, 203, 238, 1);
  border: 1px solid rgba(81, 203, 238, 1);
}
.input1 {
  border: 1px solid rgb(168, 168, 168);
  border-radius: 3px;
  width: 60%;
  height: 35px;
  padding: 10px;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */
}
.input1:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(81, 203, 238, 1);
  border: 1px solid rgba(81, 203, 238, 1);
}
</style>
