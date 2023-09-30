<template>
    <v-breadcrumbs class="breadcrumb">
        <v-row class="d-flex justify-center align-center">
            <v-col cols="7">
                <BtnLg title="أضف تصنيف" icon="mdi-plus" @click="this.dialog = true" />
            </v-col>
            <v-col align="end" cols="5">
                <h1 class="">التصنيفات</h1>
            </v-col>
        </v-row>
    </v-breadcrumbs>
    <v-container class="container" v-if="categories.length !== 0">
        <v-row class="d-flex flex-row-reverse ">
            <v-col v-for="(categorie, index) in categories" :key="categories.id"
                :cols="$vuetify.display.mdAndUp ? '4' : '12'">
                <v-card class="mb-1" elevation="1" :to="{ name: 'admincategoriedetail', params: { categorieId: categorie.name } }">
                    <div class="d-flex justify-space-between align-center">
                        <div class="text-green ma-5">
                            <h3><v-icon>mdi-pencil</v-icon></h3>
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
    </v-container>
    <div class="text-center">
        <v-dialog class="dialog" v-model="dialog" width="90%">
            <v-card>
                <v-card-item class="">
                    <h3 class="mb-3">إسم التصنيف</h3>

                    <v-avatar size="120" rounded="0">
                        <v-img class="d-flex mb-3" @click="() => {
                            this.$refs.image_0.click();
                        }
                            " :src="image == null || image == '' ? imgvoid : image" contain>
                            <v-progress-circular v-if="img_uploading" :size="60" :width="7" color="teal-lighten-1"
                                indeterminate></v-progress-circular>
                        </v-img>
                        <input ref="image_0" class="d-none" type="file" accept="image/*" label="" :disabled="img_changes"
                            @change="uploadImage(event, 0)" />
                    </v-avatar>
                    <v-text-field append-inner-icon="mdi-pencil" placeholder="" variant="outlined" v-model="title"
                        :loading="loading" :readonly="loading"></v-text-field>
                </v-card-item>
                <v-divider></v-divider>
                <v-card-actions class="mb-5">
                    <v-btn block color="green-lighten-1" size="large" variant="elevated" class="text-h6 text-white mt-5"
                        :disabled="this.title == ''" @click="addCategorie()">
                        أضف تصنيف
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
  
<script>
import { mapGetters } from "vuex";
import axiosInstance from "../../axios/axiosInstance";
import { useDisplay } from "vuetify";
import imagevoid from "../../assets/void-imagep.png";

import BtnLg from "@/components/BtnLg";

export default {
    setup() {
        const { display } = useDisplay();
    },

    components: {
        BtnLg,
    },

    data() {
        return {
            storeId: "",
            categories: '',
            //dialog add categorie            
            dialog: false,
            title: '',
            loading: false,
            //image           
            imgvoid: imagevoid,
            image: '',
            img_changes: false,
            img_uploading: false,
        };
    },

    computed: {
        ...mapGetters(["getStoreId"]),
    },

    methods: {
        async getUrl() {
            try {
                const response = await axiosInstance.post(`/store/${this.storeId}/images/geturl`);
                return response.data
            } catch (error) {
            }
        },
        async uploadImage(e, index) {
            this.img_uploading = true
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
            this.image = img_url

            this.img_uploading = false
            this.img_changes = true

        },
        addCategorie() {
            this.loading = true
            const fd = {
                name: this.title,
                image: this.image
            }
            this.loading = true;
            axiosInstance.post(`/store/${this.storeId}/addcategorie`, fd).then((response) => {
                if (response.status === 200) {
                    this.categories = response.data
                    this.loading = false
                    this.title = ''
                    this.dialog = false
                }
            });
        }
    },
    created() {
        this.storeId = this.getStoreId;
        axiosInstance
            .get(`/store/getcategories/${this.storeId}`)
            .then((response) => {
                this.categories = response.data;
            })
            .catch((err) => { });
    },
};
</script>
<style scoped>
.active {
    background-color: aqua;
}
</style>
  