<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app>
      <v-list>
        <v-list-tile
          router
          :to="menu.to"
          :key="i"
          v-for="(menu, i) in menus"
          exact>
          <v-list-tile-action>
            <v-icon v-html="menu.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="menu.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="!isLogedIn" router :to="'/login'" exact>
          <v-list-tile-action>
            <v-icon>account_box</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Masuk
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-else @click="logout" exact>
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Keluar
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed color="primary" flat dark dense app>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title" ></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container>
        <v-alert type="error" :value="alert.show" @input="dismissAlert()" dismissible>
          {{ alert.content }}
        </v-alert>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed>
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data() {
      console.log(this.$store.getters.isLogedIn)
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        menus: !this.$store.getters.isLogedIn ? [
          { icon: 'apps', title: 'Beranda', to: '/' },
          { icon: 'location_city', title: 'Ajukan Pinjaman', to: '/submit-loan'},
          { icon: 'folder', title: 'Daftar Rumah', to: '/house-list'},
        ] : [ 
          { icon: 'apps', title: 'Beranda', to: '/' },
          { icon: 'account_circle', title: 'Dasbor', to: '/profile'}, 
          { icon: 'location_city', title: 'Ajukan Pinjaman', to: '/submit-loan'},
          { icon: 'folder', title: 'Daftar Rumah', to: '/house-list'},] ,
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Rumas'
      }
    },
    computed: {
      isLogedIn() {
        return this.$store.getters.isLogedIn;
      },
      alert() {
        return this.$store.getters.alert;
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('logout');
        this.$router.push({
          name: 'index'
        })
      },
      dismissAlert() {
        this.$store.commit('clearAlert')
      }
    }
  }
</script>
