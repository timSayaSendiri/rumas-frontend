<template>
  <v-layout align-center justify-center>
  <v-flex xs12 sm6 md6 text-xs-center mt-5>
    <v-stepper v-model="step" alt-labels>
      <v-stepper-header>
      <v-stepper-step step="1" :complete="step > 1">Data Rumah</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="2" :complete="step > 2">Name of step 2</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3">Name of step 3</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
      <v-stepper-content step="1">
          <v-card color="grey lighten-1" class="mb-5" height="200px"><v-flex></v-flex>
          </v-card>
          <v-btn color="primary" @click.native="step = 2">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
      </v-stepper-content>
      <v-stepper-content step="2">
          <v-card color="grey lighten-1" class="mb-5" height="200px">
          </v-card>
          <v-btn color="primary" @click.native="step = 3">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
      </v-stepper-content>
      <v-stepper-content step="3">
          <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
          <v-btn color="primary" @click.native="step = 1">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
      </v-stepper-content>
      </v-stepper-items>
  </v-stepper>
  </v-flex>
</v-layout>
</template>
<script>
import bahasa from 'vee-validate/dist/locale/id'
export default {
    $_veeValidate: {
    validator: "new"
  },
    data () {
        return {
            step: 0,
            valid: false,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 10 || 'Name must be less than 10 characters'
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ]
        }
    },
    mounted() {
    this.$validator.localize("en", bahasa);
  },
}
</script>
