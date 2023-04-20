<template>
  <div class="text-center">
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          class="font-weight text-h6 text-grey-darken-2"
          size="large"
          rounded="1"
          append-icon="mdi-layers-outline"          
          v-bind="props"
          block
        >
          كل التصنيفات
        </v-btn>
      </template>

      <v-list>
        <v-list-item class="text-right" >
          <v-btn
          class="font-weight text-subtitle-1 text-grey-darken-4"
          size="small"
          variant="plain"
          @click="getCategorie(0)"
        >
        كل التصنيفات
        </v-btn>
        </v-list-item>
        <v-list-item class="text-right" v-for="(item, index) in allcategories" :key="index">
          <v-btn
          class="font-weight text-subtitle-1 text-grey-darken-4"
          size="small"
          variant="plain"
          @click="getCategorie(item.id)"
        >
        {{ item.name }}
        </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CategorieFilter",

  props: {
    storeId: {
      type: Number,
    },
  },

  data(){
    return{
      
    }
  },

  computed: {
    ...mapGetters(["allcategories"]),
  },

  methods: {
    ...mapActions(["fetchCategories", "getCategorie"]),
  },

  created() {
    this.fetchCategories(this.storeId);
  },
};
</script>
