<template>
  <v-breadcrumbs class="d-flex justify-end align-center breadcrumb">
    <div></div>
    <div>
      <h2>الإعدادات</h2>
    </div>
  </v-breadcrumbs>
  <div class="container mt-5">
    <v-row class="d-flex flex-row-reverse">
      <v-col :cols="$vuetify.display.mdAndUp ? '6' : '12'">        
        <v-card class="mx-auto text-right">
          <v-card-item>
            <div>
              <div class="mb-3">
                <h3>
                  رابط المتجر<v-icon class="ml-2">mdi-link</v-icon>
                </h3>
                <v-divider class="ma-3"></v-divider>
              </div>
              <div class="d-flex justify-center">
                <h3>https://matjary.app/{{storeId}}</h3>
              </div>
            </div>
          </v-card-item>          
          <router-link class="text-decoration-none" :to="{
              name: 'storedetail',
              params: { storeId: this.storeId },
            }">
          <v-card-actions class="d-flex justify-center">
            <v-btn class="ml-2" variant="flat" size="large" color="green-lighten-1">
              <h4>رؤية المتجر <v-icon class="ml-2">mdi-eye-outline</v-icon></h4>
            </v-btn>
          </v-card-actions>
          </router-link>
        </v-card>

        <v-card class="mx-auto text-right mt-5">
          <v-card-item>
            <div>
              <div class="mb-3">
                <h3>
                  شعار المتجر<v-icon class="ml-2">mdi-image-outline</v-icon>
                </h3>
                <v-divider class="ma-3"></v-divider>
              </div>
              <div class="d-flex justify-center">
                <v-avatar size="100">
                  <v-img :src="this.logo == null || this.logo == ''
                    ? src1
                    : this.logo
                    ">
                    <v-progress-circular v-if="img_uploading" :size="60" :width="5" color="teal-lighten-1"
                      indeterminate></v-progress-circular></v-img>
                  <input ref="image_logo" class="d-none" type="file" accept="image/*" label=""
                    @change="uploadImage(event)" />
                </v-avatar>
              </div>
            </div>
          </v-card-item>
          <v-card-actions class="d-flex justify-center">
            <v-btn class="ml-2" variant="flat" size="large" color="teal-lighten-1" @click="() => {
              this.$refs.image_logo.click();
            }">
              <h4>تعديل<v-icon class="ml-2">mdi-pencil-outline</v-icon></h4>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col :cols="$vuetify.display.mdAndUp ? '6' : '12'">
        <v-card class="mx-auto text-right">
          <v-card-item>
            <div>
              <div class="mb-3">
                <h3>
                  معلومات الشحن<v-icon class="ml-2">mdi-truck-outline</v-icon>
                </h3>
                <v-divider class="ma-3"></v-divider>
              </div>
              <div class=" text-right">                
                <h3 class="mt-3">الاستلام من المتجر <v-icon :icon="this.pickup? 'mdi-check' :'mdi-close' "></v-icon> </h3>
                <h3 class="mt-3">شحن و توصيل <v-icon :icon="this.shipping? 'mdi-check' :'mdi-close' "></v-icon> </h3>
                <v-row class="mr-5 mt-3">
                    <v-col cols="6">
                      <h3>  د.م  {{ shipcost }}</h3>
                    </v-col>
                    <v-col cols="6">
                        <h3 class="">ثمن الشحن </h3>
                    </v-col>
                    </v-row>  
              </div>
            </div>
          </v-card-item>
          <v-card-actions class="d-flex justify-center">
            <router-link class="text-decoration-none text-grey-darken-4" :to="{
              name: 'adminshipping',
            }">
              <v-btn class="ml-2" variant="flat" size="large" color="teal-lighten-1">
                <h4>تعديل<v-icon class="ml-2">mdi-pencil-outline</v-icon></h4>
              </v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col :cols="$vuetify.display.mdAndUp ? '6' : '12'">
        <v-card class="mx-auto text-right">
          <v-card-item>
            <div>
              <div class="mb-3">
                <h3>
                  معلومات التواصل<v-icon class="ml-2">mdi-truck-outline</v-icon>
                </h3>
                <v-divider class="ma-3"></v-divider>
              </div>
              <div class=" text-right">                
                <h3 class="mt-3">الهاتف <v-icon icon="mdi-phone-in-talk-outline"></v-icon> </h3>
                <h4>{{ this.telephone }}</h4>
                <h3 class="mt-3">واتساب <v-icon icon="mdi-whatsapp"></v-icon> </h3>
                <h4>{{ this.whatsapp }}</h4>
                <h3 class="mt-3">العنوان <v-icon icon="mdi-map-marker-radius-outline"></v-icon> </h3>
                <h4>{{ this.maps }}</h4>
              </div>
            </div>
          </v-card-item>
          <v-card-actions class="d-flex justify-center">
            <router-link class="text-decoration-none text-grey-darken-4" :to="{
              name: 'admininfo',
            }">
              <v-btn class="ml-2" variant="flat" size="large" color="teal-lighten-1">
                <h4>تعديل<v-icon class="ml-2">mdi-pencil-outline</v-icon></h4>
              </v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
  
<script>
import { mapGetters } from "vuex";
import { useDisplay } from "vuetify";

import axiosInstance from "../../axios/axiosInstance";

import storevoid from "../../assets/void_store.png";

export default {
  setup() {
    const { display } = useDisplay();
  },

  data() {
    return {
      src1: storevoid,
      img_uploading: false,
      storeId: "",
      storename: "",
      storeurl: "",
      adress: "",
      telephone: "",
      whatsapp: "",
      maps: "",
      facebook: "",
      pickup:"",
      shipping: "",
      shipcost: "",
      logo: "",

    };
  },

  methods: {
    async getUrl() {
      try {
        const response = await axiosInstance.post(`/store/${this.storeId}/images/getlogourl`);
        return response.data
      } catch (error) {
        console.error(error);
      }
    },
    async uploadImage(e) {
      this.img_uploading = true
      var img_data = this.$refs['image_logo'].files[0];
      // get signed url from s3
      const url = await this.getUrl()
      // put image to s3 bucket
      await fetch(url, {
        method: 'PUT',
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: img_data
      })
      // show image 
      this.logo = url.split('?')[0]
      this.img_uploading = false
    },
  },
  computed: {
    ...mapGetters(["getUserId", "getStoreId"]),
  },
  created() {
    this.storeId = this.getStoreId;
    axiosInstance.get(`/store/get/${this.storeId}`).then((response) => {
      if (response.status === 200) {
        this.storename = response.data.storename;
        this.logo = response.data.logo;
        this.pickup = response.data.pickup
        this.shipping = response.data.shipping
        this.shipcost = response.data.shipcost
        this.telephone=response.data.telephone
        this.whatsapp=response.data.whatsapp
        this.maps=response.data.maps

      }
    });
  },
};
</script>
  