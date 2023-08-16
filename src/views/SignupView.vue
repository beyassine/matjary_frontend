<template>
    <ExtendHeader bordered="false" />
    <div class=" bg-white d-flex justify-center">
        <v-form :class="$vuetify.display.smAndUp ? 'signupFormLg' : 'signupFormSm'" v-model="valid">
            <div class="mt-5 text-right align-center">
                <h2 class="text-center mb-2">أنشئ متجرك</h2>
                <h4 class="text-center text-grey mb-4">طور تجارتك مع منصة متجري</h4>
                <v-row class="d-flex flex-row-reverse mt-5">
                    <v-col cols="12">
                        <h3 class="mb-3">إسم المتجر <v-icon class="ml-2">mdi-pencil-outline</v-icon></h3>
                        <v-text-field prepend-inner-icon="" type="text" outlined v-model="storename"
                            :rules="Required"></v-text-field>
                        <h5 v-if="usernameerror" class="text-red">{{ texterror }}</h5>
                    </v-col><!-- 
                    <v-col cols="12">
                        <h3 class="mb-3">مجال التجارة <v-icon class="ml-2">mdi-tag-multiple-outline</v-icon> </h3>
                        <v-select label="إختر مجال تجارتك" v-model="categorie" :items="store_categrories" :rules="Required"
                            multiple></v-select>
                    </v-col> -->
                    <v-col cols="12">
                        <h3 class="mb-3">رقم الواتساب <v-icon class="ml-2 text-green">mdi-whatsapp</v-icon></h3>
                        <vue-tel-input class="tel-input" v-model="phone" v-bind="bindProps"
                            @country-changed="countryChanged"></vue-tel-input>
                        <h5 v-if="telerror" class="text-red">رقم الهاتف غير صحيح</h5>
                        <h5 v-if="phoneerror" class="text-red">{{ texterror }}</h5>
                    </v-col>
                    <v-col :cols="$vuetify.display.smAndUp ? '6' : '12'">
                        <h3 class="mb-3">كلمة المرور<v-icon class="ml-2">mdi-lock-outline</v-icon></h3>
                        <v-text-field :prepend-inner-icon="visible1 ? 'mdi-eye-off' : 'mdi-eye'"
                            :type="visible1 ? 'text' : 'password'" outlined v-model="password1" :rules="passwordRules"
                            @click:prepend-inner="visible1 = !visible1"></v-text-field>
                    </v-col>
                    <v-col :cols="$vuetify.display.smAndUp ? '6' : '12'">
                        <h3 class="mb-3">تأكيد كلمة المرور<v-icon class="ml-2">mdi-lock-outline</v-icon></h3>
                        <v-text-field :prepend-inner-icon="visible2 ? 'mdi-eye-off' : 'mdi-eye'"
                            :type="visible2 ? 'text' : 'password'" type="password" outlined v-model="password2"
                            :rules="confirmpassworRules" required
                            @click:prepend-inner="visible2 = !visible2"></v-text-field>
                    </v-col>
                </v-row>
                <v-btn :disabled="!vaidform" :loading="loading" class="mt-5 text-white" color="light-green" size="large"
                    block dark @click="register">
                    <h3>تابع</h3>
                </v-btn>
                <h4 class="text-center mt-5">
                    <router-link class="text-decoration-none" to="login">
                        <v-btn class="text-light-green" variant="flat">
                            <h3>تسجيل الدخول</h3>
                        </v-btn>
                    </router-link>
                    لديك حساب ؟
                </h4>
            </div>
        </v-form>
    </div>
</template>

<script>
import * as amplitude from '@amplitude/analytics-browser';
import parsePhoneNumber from 'libphonenumber-js'

import majary_logo from "../assets/matjary_logo_g.png";

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
            logo: majary_logo,
            valid: false,
            loading: false,
            categorie: '',
            categoryList: '',
            store_categrories: ['أجهزة إلكترونية', 'الأزياء', 'المنزل و المطبخ', 'الصحة و الجمال', 'مستلزمات رياضية', 'منتجات الأطفال', 'مجالات أخرى'],
            password1: "",
            password2: "",
            visible1: false,
            visible2: false,
            Required: [
                (v) => !!v || "لا يجوز أن يُترَك هذا الحقل فارغًا",
            ],
            passwordRules: [(v) => !!v || "أدخل كلمة المرور"],
            confirmpassworRules: [
                (v) => !!v || "أدخل كلمة المرور",
                (v) => v == this.password1 || "كلمة المرور غير متطابقة",
            ],
            usernameerror: false,
            phoneerror: false,
            texterror: '',
            //vue-tel-input
            phone: "",
            countryCode: '',
            telerror: false,
            validatetel: "",
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
            // storename
            storename: '',
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
        };
    },
    computed: {
        vaidform() {
            if (this.valid && this.phone !== '') {
                return true
            }
            return false
        },
        username() {
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
            return constructedUrl.toLowerCase()
        },
    },
    methods: {
        countryChanged(country) {
            this.countryCode = country.iso2
        },
        checkPhone() {
            var phoneNumber = parsePhoneNumber(this.phone, this.countryCode)
            if (phoneNumber.isValid()) {
                this.telerror = false
                this.validatetel = phoneNumber.number;
            } else {
                this.telerror = true
                this.validatetel = "";
            }
        },
        register() {
            this.loading = true
            if (this.categorie !== '') {
                this.categorie.splice(0, 1);
                this.categoryList = this.categorie.map((category) => category.trim());
            }
            this.checkPhone()
            if (this.telerror) {
                console.log('incorrect')
                this.loading = false

            } else {
                const fd = {
                    username: this.username,
                    store_id:this.username,
                    storename: this.storename,
                    phone: this.validatetel,
                    country: this.countryCode,
                    password: this.password1,
                    role: 'seller',
                }; axios
                    .post(`/user/create`, fd)
                    .then((response) => {
                        if (response.status == 200) {
                            this.loading = false;
                            this.$router.push({
                                name: "login",
                            })
                        }
                    })
                    .catch((error) => {
                        if (error.response) {
                            if (error.response.data == 'invalid_username') {
                                this.loading = false;
                                this.usernameerror = true;
                                this.texterror = "إسم المتجر مستعمل";
                                return;
                            }
                            if (error.response.data == 'invalid_phone') {
                                this.loading = false;
                                this.usernameerror = false;
                                this.phoneerror = true;
                                this.texterror = "رقم الهاتف مستعمل";
                                return;
                            }
                        }
                    });
            }
        },
    },
    created() {
        amplitude.track('Sign Up');
        axios.get('https://ip2c.org/s').then((response) => {
            this.countryCode=response.data.split(';')[1]
        })
    },
};
</script>

<style lang="scss" scoped>
.signupFormLg {
    margin: auto;
    width: 40%;
    height: 100%;
    padding: 10px;
}

.signupFormSm {
    margin: auto;
    width: 90%;
    height: 100%;
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