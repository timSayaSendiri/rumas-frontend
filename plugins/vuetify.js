import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: '#0B549F', // a color that is not in the material colors palette
    accent: '#FCDA31',
    secondary: '#4b6584',
    info: '#4b7bec',
    warning: '#fed330',
    error: '#fc5c65',
    success: '#26de81'
  }
})
