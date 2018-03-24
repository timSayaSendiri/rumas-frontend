<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>

        <v-card-text>
            <div class="text-xs-center ma-2">
              <logo/>
              <h2 class="headline">Rumas</h2>
              <span class="subheading">Cicil Rumah Tenang Tanpa Bunga</span>
            </div>

        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo,
  }
}
</script>
