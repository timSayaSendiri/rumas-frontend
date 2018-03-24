<template>
  <v-layout wrap>
    <v-flex xs12 md12 sm12>
      <v-text-field
        label="Search"
        v-model="searchKeyword"
      ></v-text-field> 
    </v-flex>
    <v-flex xs12 pa-1 sm6 md3 v-for="(house, index) in houseList" :key="index">
      <v-card>
        <v-card-media src="" height="200px">
          <img :src="house.gbr1" />
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{ house.nama }}</h3>
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
      searchKeyword: '',
      houseList: []
    }
  },
  computed: {
    ...mapState({
    //   houseList: state => state.main.houseList
    })
  },
  mounted () {
    // this.$store.dispatch('getHouses')
    this.houseList = [{
      "id_stk_kavling": 18,
      "id_stk_dev": 0,
      "id_stk_proyek": 1233065,
      "id_tipe_rumah": 0,
      "nama": "Rumah",
      "harga": 449114000,
      "jenis": 3,
      "gbr1": "https://www.btnproperti.co.id/cdn1/images/tipe-rumah/20170816/medium/3c62d3a0-5cb5-4c3f-b1b1-3d8239b8a97c.jpeg",
      "gbr2": "https://www.btnproperti.co.id/cdn1/images/tipe-rumah/20170816/medium/017ce54a-2424-4e5d-9fd7-6de4451e1d0a.jpeg",
      "gbr3": "https://www.btnproperti.co.id/cdn1/images/tipe-rumah/20170816/medium/510d118d-4eff-4566-99a7-53f962fe3b75.jpeg",
      "gbr4": "",
      "gbr5": "",
      "deskripsi": "",
      "subsidi": false,
      "luas_tanah": 22,
      "luas_bangunan": 22,
      "tahun_bangun": 2017,
      "lantai": "1",
      "jalur_pdam": true,
      "jalur_telp": true,
      "daya_listrik": "1.300",
      "kamar_tidur": true,
      "kamar_mandi": true,
      "garasi": true,
      "sertifikat": "SHGB",
      "alamat": "JL BINTARO PERMAI",
      "klaster": "BINTARO PARKVIEW",
      "blok": "LANTAI 2",
      "no": "15",
      "kodepos": 12330,
      "id_propinsi": 31,
      "id_kab_kota": 3174,
      "id_kecamatan": 317410,
      "id_desa_kelurahan": 3174101002,
      "latitude": "-6.2525412",
      "longitude": "106.76179839999998",
      "status_unit": 2,
      "status_jual": 2,
      "status_pengajuan": 4,
      "id_booking": "",
      "jml_dilihat": 0,
      "keyword": "kav17081614283691363, 22, pt.duta putra land, bintaro park view , 22, dki jakarta, kota adm. jakarta selatan, pesanggrahan, bintaro",
      "tgl_insert": null,
      "jenis_lama": "",
      "subsidi_lama": "",
      "jalur_pdam_lama": "",
      "jalur_telepon_lama": "",
      "status_unit_lama": "",
      "status_pengajuan_lama": "",
      "video": "",
      "tgl_update_status": null,
      "last_update": null,
      "status_eloan": true,
      "respon_eloan": "Accept",
      "tgl_kirim_eloan": null,
      "kategori_agunan": "",
      "jenis_lelang": false,
      "created_at": null,
      "updated_at": null           
    }]
  },
  methods: {
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

