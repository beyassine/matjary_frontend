<template>
    <v-btn
      class="font-weight-black text-h5"
      size="x-large"
      block      
      rounded="pill" 
    >
     {{title}} <v-icon class="ml-1">{{icon}}</v-icon>
    </v-btn>
</template>
<script>
export default {
  name: "BtnXlg",

  props: {
    title: {
      type: String,
    },
    icon: {
      type: String,
    },
  },

  data(){
    return{
    }
  }
  
};
</script>
<style scoped>
.main-btn{
  background-image: linear-gradient(to top left, rgba(18, 140, 126,.8), rgba(18, 140, 126,.8));
}
</style>