<template>
  <div>
    Filter Todos:
    <select @change="getCategorie($event)">
      <option v-for="item in allcategories" :key="item.id" :value="item.id">
        {{ item.id }}-{{ item.name }}
      </option>
    </select>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "FilterCategories",

  props: {
    storeId: {
      type: Number,
    },
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

<style scoped>
select {
  margin-top: 20px;
  padding: 6px;
  border: #41b883 1px solid;
}
</style>