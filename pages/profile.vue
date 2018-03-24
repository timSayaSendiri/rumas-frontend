<template>
    <v-layout align-center justify-center pa-0>
    <v-flex xs12 sm4 md4 text-xs-center pa-0>
      <v-layout justify-center pb-4>
        <v-flex xs3 justify-center>
          <v-avatar
            size="60px"
            class="grey lighten-4"
           >
          <img src="https://avatars1.githubusercontent.com/u/17113995?s=400&v=4" alt="avatar">
        </v-avatar>
       </v-flex>
       <v-flex xs9 justify-center> 
          foto
       </v-flex> 
     </v-layout> 
     <v-divider></v-divider>
      <v-layout pt-4>
        profile header
     </v-layout> 
    </v-flex>
  </v-layout>
</template>
<script>
import bahasa from 'vee-validate/dist/locale/id'
export default {
    $_veeValidate: {
    validator: "new"
  },
    mounted() {
    this.$validator.localize("en", bahasa);
  },
}
</script>
