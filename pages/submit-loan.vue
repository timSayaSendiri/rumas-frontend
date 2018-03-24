<template>
	<v-layout align-center justify-center>
    <v-flex xs12 sm12 md12 text-xs-center mt-5>
      <v-stepper v-model="e1">
        <v-stepper-header>
        <v-stepper-step step="1" :complete="e1 > 1">Isi Data Rumah</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" :complete="e1 > 2">Isi Data Akun</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">Isi Data Diri</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
        <v-stepper-content step="1">
					<v-list dense>
						<v-list-tile>
							<v-list-tile-content>Nama:</v-list-tile-content>
							<v-list-tile-content>{{ house.name }}</v-list-tile-content>
						</v-list-tile>
						<v-list-tile>
							<v-list-tile-content>Alamat:</v-list-tile-content>
							<v-list-tile-content>{{ house.address }}</v-list-tile-content>
						</v-list-tile>
						<v-list-tile>
							<v-list-tile-content>Harga:</v-list-tile-content>
							<v-list-tile-content>{{ house.price }}</v-list-tile-content>
						</v-list-tile>
						<v-list-tile>
							<v-list-tile-content>Luas Tanah:</v-list-tile-content>
							<v-list-tile-content>{{ house.surfaceArea }}</v-list-tile-content>
						</v-list-tile>
						<v-list-tile>
							<v-list-tile-content>Luas Bangungan:</v-list-tile-content>
							<v-list-tile-content>{{ house.buildingArea }}</v-list-tile-content>
						</v-list-tile>
					</v-list>
					<v-btn color="primary" @click="sendHouseData">Continue</v-btn>
					<v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content step="2">
					<v-text-field
						label="Email"
						v-model="account.email"
					></v-text-field>
					<v-text-field
						label="Password"
						type="password"
						v-model="account.password"
					></v-text-field>
					<v-btn color="primary" @click="sendAccountData">Continue</v-btn>
					<v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content step="3">
					<v-text-field
						label="Nama"
						v-model="profile.name"
					></v-text-field>
					<v-date-picker
						v-model="profile.birthDate"
					>
					</v-date-picker>
					<v-text-field
						label="NIK"
						v-model="profile.nik"
					></v-text-field>
					<v-text-field
						label="Nomor Telepon"
						v-model="profile.phone"
					></v-text-field>
					<v-text-field
						label="Nama Ibu"
						v-model="profile.motherName"
					></v-text-field>
					<v-text-field
						label="Foto"
						v-model="profile.profilePictureName"
					></v-text-field>
					<v-text-field
						label="Alamat"
						v-model="profile.address"
					></v-text-field>
					<v-btn color="primary" @click="sendProfileData ">Continue</v-btn>
					<v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
    </v-flex>
  </v-layout>
</template>
<script>
import bahasa from 'vee-validate/dist/locale/id'
import { mapState } from 'vuex'

export default {
	$_veeValidate: {
		validator: "new"
  },
	data () {
		return {
			e1: 0,
			house: {},
			account: {
				email: '',
				password: ''
			},
			profile: {},
		}
	},
	mounted() {
		if (Object.keys(this.$route.query).length) {
			const {
				nama,
				harga,
				alamat,
				luas_tanah,
				luas_bangunan,
				latitude,
				longitude,
				gbr1 
			} = this.$route.query

			this.house = {
				...this.house,
				name: nama,
				price: harga,
				address: alamat,
				surfaceArea: luas_tanah,
				buildingArea: luas_bangunan,
				location: {
					lat: latitude,
					lng: longitude
				},
				imageUrl: gbr1,
			}
		}
		this.$validator.localize("en", bahasa);
	},
	computed: {
		...mapState({
			currentHousePick: state => state.main.currentHousePick,
			currentProfile: state => state.main.currentProfile,
			currentAccount: state => state.main.currentAccount
		})
	},
	methods: {
		sendHouseData () {
			this.$store.dispatch('sendHouseData', this.house)	
			this.e1 = 2
		},
		sendAccountData () {
			this.$store.dispatch('sendAccountData', this.account)
			this.e1 = 3
		},
		sendProfileData () {
			this.$store.dispatch('sendProfileData', {
				userId: this.currentAccount.id,
				cifNumber: 123213213213,
				...this.profile
			})
		}
	}
}
</script>
