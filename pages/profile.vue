<template>
    <v-layout align-center justify-center pa-0>
    <v-flex xs12 sm4 md4 text-xs-center pa-0>
      <v-layout justify-center pb-2 column>
        <v-layout>
           <v-flex xs3 align-center>
             <v-layout align-center justify-center column>
              <v-avatar
                size="60px"
                class="grey lighten-4 mb-2"
              >
              <img :src="profile.profilePictureName" alt="avatar">
            </v-avatar>
            <span class="title">{{profile.name}}</span>
           </v-layout>
          </v-flex>
       <v-flex xs9 justify-center> 
         <v-layout pb-1 column>
           <v-layout justify-center>
              <span class="smallSpan">Sisa pinjaman</span>
            </v-layout>
          <v-layout>
            <v-flex xs6>
              <v-icon class="pr-2" color="orange"> monetization_on </v-icon>
            <span>{{loanInfo.sisaHutang}} gram</span> 
            </v-flex>
            <v-flex xs6>
              <span>{{loanInfo.sisaTenor}} bulan</span>  
            </v-flex>
          </v-layout> 
         </v-layout>
         <v-divider></v-divider>
         <v-layout pb-1 column>
             <v-layout justify-center>
              <span class="smallSpan">berat emas yang harus di bayar</span>
            </v-layout>
          <v-layout>
            <v-flex xs6>
              <v-icon class="pr-2" color="orange"> monetization_on </v-icon>
            <span>{{loanInfo.cicilanMinimunEmas}} gram</span> 
            </v-flex>
            <v-flex xs6>
              <span>Rp.{{hargaEmas}}/gram</span>  
            </v-flex>
          </v-layout> 
         </v-layout>
         <v-divider></v-divider>
        <v-layout justify-center>
          <v-flex>
            <v-layout justify-center>
              <span class="body-2">Minimum payment</span>
            </v-layout>
            <v-layout justify-center>
              <span class="body-1">Rp.{{this.jumlahBayar}}</span>
            </v-layout>
          </v-flex>
        </v-layout>
       </v-flex> 
       </v-layout>
       <v-layout>
       <v-flex xs12>
        <v-btn block color="primary" @click="goToPayment" dark>Lakukan Pembayaran</v-btn>
       </v-flex>
       </v-layout>
     </v-layout> 
     <v-divider></v-divider>
      <v-layout >
        <v-flex xs12>
          <v-layout justify-center pt-1 pb-2>
            <span class="subheading">Riwayat Transaksi</span>
          </v-layout>
          <v-layout justify-center v-for="transaction in transactions" v-bind:key="transaction.id">
            <v-flex xs12 mb-3>
              <v-card class="pt-1 pb-2">
                <v-layout pr-3 align-center>
                  <v-flex xs3>
                    <v-layout v-if="transaction.type === 'loan'" justify-center>
                      <v-icon color="red">file_download</v-icon>
                    </v-layout>
                    <v-layout v-else justify-center>
                      <v-icon color="green">file_upload</v-icon>
                    </v-layout>
                    <v-layout justify-center>
                     <span >{{transaction.type}}</span> 
                    </v-layout>
                  </v-flex>
                  <v-flex xs9>
                    <v-layout  column>
                      <v-layout justify-center align-center><span class="smallSpan">transaksi</span></v-layout>
                       <v-layout>
                         <v-flex xs6 >
                            <v-icon color="orange" class="pr-2"> monetization_on </v-icon>
                            <span>{{transaction.goldWeight}} gram</span>
                          </v-flex>
                        <v-flex xs6>
                          <v-icon class="pr-2" color="green"> attach_money </v-icon> 
                          <span>Rp.{{transaction.amountInRupiah}}</span>
                        </v-flex>
                       </v-layout>
                    </v-layout>
                    <v-divider></v-divider>
                    <v-layout column>
                       <v-layout justify-center>
                         <span class="smallSpan">Sisa pinjaman</span>
                        </v-layout>
                      <v-layout>
                        <v-flex xs6>
                          <v-icon class="pr-2" color="orange"> monetization_on </v-icon>
                        <span>{{transaction.poorOfLoan}} gram</span> 
                        </v-flex>
                        <v-flex xs6>
                          <span>{{transaction.poorOfMonth}} bulan</span>  
                        </v-flex>
                      </v-layout>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
     </v-layout> 
    </v-flex>
  </v-layout>
</template>
<script>
import bahasa from 'vee-validate/dist/locale/id'
import { mapState } from 'vuex'
const userId = '5ab5aff49a0bea27dbb9efc1'
export default {
    $_veeValidate: {
    validator: "new"
  },
  data() {
    return {
      loanInfo:{
        sisaTenor:"10",
        sisaHutang:'990',
        cicilanMinimunEmas:'10'
      },
      hargaEmas:"600000",
    }
  },
  methods:{
    goToPayment(){
      this.$router.push({path:'payment'})
    }
  },
  computed: {
    jumlahBayar(){
      return `${parseFloat(this.loanInfo.cicilanMinimunEmas) * parseFloat(this.hargaEmas)}`
    },
    ...mapState({
      profile: state => state.main.userProfile,
      transactions: state => state.main.userTransactions
    })
  },
  mounted() {
    this.$validator.localize("en", bahasa);
    this.$store.dispatch('getProfileData', userId)
    this.$store.dispatch('getUserTransaction', userId)
    this.profile = this.$store.state.main.userProfile
  },
}
</script>
<style>
 .red{
   color:red
 }
 .blue{
   color:green
 }
 .gold{
   color:gold
 }
 .smallSpan {
   font-size: 10px;
 }
</style>