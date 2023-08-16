<template>
  <v-breadcrumbs class="d-flex justify-center align-center breadcrumb">
    <div></div>
    <div>
      <h2>منتج جديد</h2>
    </div>
  </v-breadcrumbs>
  <div class="container">
    <v-form class="bg-white mt-3" v-model="form" @submit.prevent="onSubmit">
      <v-row>
        <v-col :cols="$vuetify.display.mdAndUp ? '4' : '12'">
          <div class="d-flex align-center text-right">
            <v-card class="mx-auto" elevation="0">
              <v-card-item>
                <h3 class="mb-3">صورة المنتج</h3>
                <div v-if="img_changes[0]" class="d-flex justify-center mt-1 mb-1">
                  <v-btn class="" color="black" size="x-small" icon dark @click="deleteImage(0)">
                    <v-icon class="mt-1">mdi-close</v-icon>
                  </v-btn>
                </div>
                <v-avatar size="320" rounded="0">
                  <v-img class="d-flex" @click="() => {
                    this.$refs.image_0.click();
                  }
                    " :src="images[0] == null || images[0] == '' ? imgvoid : images[0]" contain>
                    <v-progress-circular v-if="img_uploading[0]" :size="210" :width="7" color="teal-lighten-1"
                      indeterminate></v-progress-circular>
                  </v-img>
                  <input ref="image_0" class="d-none" type="file" accept="image/*" label="" :disabled="img_changes[0]"
                    @change="uploadImage(event, 0)" />
                </v-avatar>
                <h3 class="mt-3 mb-3">صور إضافية</h3>
                <v-row class="">
                  <v-col cols="6">
                    <div v-if="img_changes[1]" class="d-flex justify-center mt-1 mb-1">
                      <v-btn class="" color="black" size="x-small" icon dark @click="deleteImage(1)">
                        <v-icon class="mt-1">mdi-close</v-icon>
                      </v-btn>
                    </div>
                    <v-avatar size="140" rounded="0">
                      <v-img class="d-flex" @click="() => {
                        this.$refs.image_1.click();
                      }
                        " :src="images[1] == null || images[1] == '' ? imgvoid : images[1]" contain>
                        <v-progress-circular v-if="img_uploading[1]" :size="60" :width="7" color="teal-lighten-1"
                          indeterminate></v-progress-circular>
                      </v-img>
                      <input ref="image_1" class="d-none" type="file" accept="image/*" label="" :disabled="img_changes[1]"
                        @change="uploadImage(event, 1)" />
                    </v-avatar>
                  </v-col>
                  <v-col cols="6">
                    <div v-if="img_changes[2]" class="d-flex justify-center mt-1 mb-1">
                      <v-btn class="" color="black" size="x-small" icon dark @click="deleteImage(2)">
                        <v-icon class="mt-1">mdi-close</v-icon>
                      </v-btn>
                    </div>
                    <v-avatar size="140" rounded="0">
                      <v-img class="d-flex" @click="() => {
                        this.$refs.image_2.click();
                      }
                        " :src="images[2] == null || images[2] == '' ? imgvoid : images[2]" contain>
                        <v-progress-circular v-if="img_uploading[2]" :size="60" :width="7" color="teal-lighten-1"
                          indeterminate></v-progress-circular>
                      </v-img>
                      <input ref="image_2" class="d-none" type="file" accept="image/*" label="" :disabled="img_changes[2]"
                        @change="uploadImage(event, 2)" />
                    </v-avatar>
                  </v-col>
                  <v-col cols="6">
                    <div v-if="img_changes[3]" class="d-flex justify-center mt-1 mb-1">
                      <v-btn class="" color="black" size="x-small" icon dark @click="deleteImage(3)">
                        <v-icon class="mt-1">mdi-close</v-icon>
                      </v-btn>
                    </div>
                    <v-avatar size="140" rounded="0">
                      <v-img class="d-flex" @click="() => {
                        this.$refs.image_3.click();
                      }
                        " :src="images[3] == null || images[3] == '' ? imgvoid : images[3]" contain>
                        <v-progress-circular v-if="img_uploading[3]" :size="60" :width="7" color="teal-lighten-1"
                          indeterminate></v-progress-circular>
                      </v-img>
                      <input ref="image_3" class="d-none" type="file" accept="image/*" label="" :disabled="img_changes[3]"
                        @change="uploadImage(event, 3)" />
                    </v-avatar>
                  </v-col>
                  <v-col cols="6">
                    <div v-if="img_changes[4]" class="d-flex justify-center mt-1 mb-1">
                      <v-btn class="" color="black" size="x-small" icon dark @click="deleteImage(4)">
                        <v-icon class="mt-1">mdi-close</v-icon>
                      </v-btn>
                    </div>
                    <v-avatar size="140" rounded="0">
                      <v-img class="d-flex" @click="() => {
                        this.$refs.image_4.click();
                      }
                        " :src="images[4] == null || images[4] == '' ? imgvoid : images[4]" contain>
                        <v-progress-circular v-if="img_uploading[4]" :size="60" :width="7" color="teal-lighten-1"
                          indeterminate></v-progress-circular>
                      </v-img>
                      <input ref="image_4" class="d-none" type="file" accept="image/*" label="" :disabled="img_changes[4]"
                        @change="uploadImage(event, 4)" />
                    </v-avatar>
                  </v-col>
                </v-row>
              </v-card-item>
            </v-card>
          </div>
        </v-col>
        <v-col align="end" :cols="$vuetify.display.mdAndUp ? '8' : '12'">
          <div class="">
            <v-card class="mx-auto" elevation="0">
              <v-card-item class="">
                <h3 class="mb-3">إسم المنتج</h3>
                <v-text-field append-inner-icon="mdi-pencil" placeholder="أدخل الإسم" variant="outlined" v-model="title"
                  :readonly="loading" :rules="required"></v-text-field>
              </v-card-item>
              <v-card-item class="">
                <h3 class="mb-3">المواصفات</h3>
                <v-textarea append-inner-icon="mdi-abjad-arabic" placeholder="مواصفات المنتج" variant="outlined"
                  v-model="description" :readonly="loading"></v-textarea>
              </v-card-item>
              <v-card-item class="">
                <h3 class="mb-3">التصنيف</h3>
                <v-select label="" :items="categories" item-title="name" item-value="name" v-model="categorie"></v-select>
              </v-card-item>
              <v-card-item class="">
                <h3 class="mb-3">سعر المنتج</h3>
                <v-text-field append-inner-icon="mdi-tag" placeholder="0.00" variant="outlined" type="number"
                  v-model="unitprice" :readonly="loading" :rules="required"></v-text-field>
              </v-card-item>
              <v-card-item class="">
                <h3 class="mb-3">الخيارات</h3>
                <v-row>
                  <v-col cols="6">
                    <h5 class="mb-3">الثمن</h5>
                    <v-text-field append-inner-icon="mdi-tag" placeholder="" variant="outlined"
                      v-model="newItemCost"></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <h5 class="mb-3">الإسم</h5>
                    <v-text-field append-inner-icon="mdi-pencil" placeholder="" variant="outlined"
                      v-model="newItemName"></v-text-field>
                  </v-col>
                </v-row>
                <v-btn color="blue-lighten-1" size="large" variant="elevated" class="text-h5" @click="addOption">
                  أضف
                </v-btn>
                <ul>
                  <li v-for="(item, index) in options" :key="index">
                    <button @click="deleteOption(index)">Delete</button>
                    {{ item.name }} - {{ item.cost }}
                  </li>
                </ul>
              </v-card-item>
              <v-card-actions>
                <v-btn :disabled="!form" :loading="loading" block color="green-lighten-1" size="large" type="submit"
                  variant="elevated" class="text-h5">
                  أضف منتج
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
<style scoped>
.v-progress-circular {
  margin: 3rem;
}
</style>
<script>
import { mapGetters } from "vuex";

import axiosInstance from "../../axios/axiosInstance";
import imagevoid from "../../assets/void-imagep.png";
import { useDisplay } from "vuetify";

export default {
  setup() {
    const { display } = useDisplay();
  },

  data() {
    return {
      storeId: "",
      userId: "",
      categories: '',
      form: false,
      // product
      title: "",
      description: '',
      categorie: '',
      unitprice: "",
      loading: false,
      required: [(v) => !!v || "لا يجوز أن يُترَك هذا الحقل فارغًا"],
      // Options
      options: [],
      option_name: '',
      option_price: '',
      //images
      imgvoid: imagevoid,
      images: ['', '', '', '', ''],
      img_changes: [false, false, false, false, false],
      img_uploading: [false, false, false, false, false],
      //Options
      newItemName: "",
      newItemCost: 0,
      options: [],

    };
  },

  computed: {
    ...mapGetters(["getUserId", "getStoreId"]),
    optionsList() {
      return this.options.map(item =>  ({
        'name': item.name.toString(),
        'cost': item.cost.toString(),
      }));
    },
  },

  methods: {
    addOption() {
      this.options.push({
        name: this.newItemName,
        cost: parseFloat(this.newItemCost),
      });
      console.log(this.optionsList)
      this.newItemName = "";
      this.newItemCost = 0;
    },
    deleteOption(index) {
      this.options.splice(index, 1);
    },
    async getUrl() {
      try {
        const response = await axiosInstance.post(`/store/${this.storeId}/images/geturl`);
        return response.data
      } catch (error) {
      }
    },
    async uploadImage(e, index) {
      this.img_uploading[index] = true
      var img_data = this.$refs['image_' + index].files[0];
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
      const img_url = url.split('?')[0]
      this.images[index] = img_url

      this.img_uploading[index] = false
      this.img_changes[index] = true

    },
    deleteImage(index) {
      this.images[index] = ''
      this.img_changes[index] = false
    },
    onSubmit() {
      if (!this.form) return;
      const fd = {
        store_id: this.storeId,
        user_id: this.userId,
        productname: this.title,
        categorie: this.categorie,
        options:this.optionsList,
        description: this.description,
        unitprice: this.unitprice.toString(),
        images: this.images,
      };
      console.log(fd)
      this.loading = true;
      axiosInstance.post(`/product/create`, fd).then((response) => {
        if (response.status === 200) {
          this.$router.push({
            name: "adminproducts",
          });
        }
      });
    },
  },

  created() {
    this.userId = this.getUserId;
    this.storeId = this.getStoreId;
    axiosInstance
      .get(`/store/getcategories/${this.storeId}`)
      .then((response) => {
        this.categories = response.data;
      })
  },
};
</script>
  