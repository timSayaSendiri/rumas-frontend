<template>
<v-layout column>
  <v-layout xs-12>
    <v-flex>
      <v-form >
      <v-text-field
        readonly
        label="nominal (Rp)"
        v-model="amountInRupiah"
      ></v-text-field>
      <v-text-field
        readonly
        label="Berat emas (gram)"
        v-model="goldWeight"
      ></v-text-field>
        <v-text-field
        readonly
        label="Rekening Nasabah"
        v-model="rekeningUser"
      ></v-text-field>
        <v-text-field
        readonly
        label="Rekening rumas"
        v-model="rekeningRumas"
      ></v-text-field>
      </v-form>
     </v-flex>
  </v-layout>
  <v-layout>
          <v-flex xs12>
        <v-btn block color="primary" @click="goToPayment" dark>Lakukan pembayaran</v-btn>
       </v-flex>
  </v-layout>
</v-layout>
</template>
<script>
import * as firebase from 'firebase'
import 'firebase/firestore';
// Initialize Firebase
var config = {
  apiKey: "AIzaSyA5OMPMlNHBNGAZ9SfXou4-2CaeKAIuMxA",
  authDomain: "rumas-68d29.firebaseapp.com",
  databaseURL: "https://rumas-68d29.firebaseio.com",
  projectId: "rumas-68d29",
  storageBucket: "rumas-68d29.appspot.com",
  messagingSenderId: "151584561559"
};
// firebase.initializeApp(config);
var db = !firebase.apps.length ? firebase.initializeApp(config).firestore() : firebase.app().firestore();

import { mapState } from 'vuex'
const hargaEmas = 620000
const userRek = '12345678'
const rumasRek = '7518265441944561'
const userId = '5ab5aff49a0bea27dbb9efc1'
export default {
  data(){
    return{
      amountInRupiah: '',
      goldWeight: '',
      rekeningRumas: rumasRek,
      rekeningUser: userRek
      }
  },
  computed: {
     ...mapState({
      userLoans: state => state.main.userLoans,
      userTransactions: state => state.main.userTransactions,
      currentAccount: state => state.main.curentAccount
    })
  },
  methods:{
    async goToPayment(){
      try{
        const date = new Date()
        const q = {
          type:'installment',
          amountInRupiah:this.amountInRupiah,
          date: date.toISOString(),
          poorOfLoan:this.userTransactions[this.userTransactions.length - 1].poorOfLoan - this.goldWeight,
          poorOfMonth: this.userTransactions[this.userTransactions.length - 1].poorOfMonth -1,
          loanId:this.userLoans.id,
          userId: userId,
          toEthAddress:rumasRek,
          fromEthAddress:userRek,
        }
        const { userId } = this.currentAccount
        const payment = await this.$axios.post(`https://udin.us/rumas-backend/api/users/${userId}/transactions/`, q)
        this.$router.push({path:'profile'})
        // firebase
        db.collection("transactions").add(q)
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
      }catch(err){
        console.log(err);
        
      }
      
    }
  },
  mounted(){
    this.$store.dispatch('getUserLoan')
  },
  watch:{
    userLoans(newUserLoans){
      this.amountInRupiah = (newUserLoans.goldWeight/newUserLoans.tenor) * hargaEmas
      this.goldWeight = newUserLoans.goldWeight/newUserLoans.tenor
    },
    curentAccount(newcurentAccount){
      this.rekeningUser = newcurentAccount.accountNumber
    }
  }

}
</script>
