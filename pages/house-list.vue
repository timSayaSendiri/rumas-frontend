<template>
  <v-layout wrap>
    <v-flex xs12 md12 sm12>
      <v-text-field
        label="Search"
        v-model="searchKeyword"
        @keyup="getHouses"
      ></v-text-field> 
    </v-flex>
    <v-flex xs12 pa-1 sm6 md3 v-for="(house, index) in houseList" :key="index">
      <v-card>
        <v-card-media src="" height="200px">
          <img :src="house.gbr2" />
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{ house.alamat }}</h3>
            <div>{{ house.deskripsi }}</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange">Detail</v-btn>
          <v-btn
            @click="getLoan(house)"
            flat color="orange"
          >Lakukan Pinjaman</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      searchKeyword: 'serpong',
    }
  },
  mounted() {

  },
  computed: {
    ...mapState({
      houseList: state => state.main.houseList
    })
  },
  methods: {
    getHouses (e) {
      if (e.keyCode == 13) {
        this.$store.dispatch('getHouses', this.searchKeyword)
      }
    },
    getLoan ({ nama, alamat, harga, luas_tanah, luas_bangunan, latitude, longitude, gbr1 }) {
      this.$router.push({
        path: '/submit-loan',
        query: {
          nama,
          harga,
          alamat,
          harga,
          luas_tanah,
          luas_bangunan,
          latitude,
          longitude,
          gbr1 
        }
      })
    }
  }
}
</script>

