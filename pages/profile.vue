<template>
    <v-layout align-center justify-center>
    <v-flex xs12 sm4 md4 text-xs-center mt-5>
      <h3>ini halaman profile</h3>
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
