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
					<v-divider></v-divider>
					<v-stepper-step step="4">Ajukan Pinjaman</v-stepper-step>
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
        </v-stepper-content>
        <v-stepper-content step="3">
					<v-text-field
						label="Nama"
						v-model="profile.name"
					></v-text-field>
					<v-dialog
						ref="dialog"
						persistent
						v-model="modal"
						lazy
						full-width
						width="290px"
						:return-value.sync="profile.birthDate"
					>
						<v-text-field
							slot="activator"
							label="Tanggal Lahir"
							v-model="profile.birthDate"
							prepend-icon="event"
							readonly
						></v-text-field>
						<v-date-picker v-model="profile.birthDate">
							<v-spacer></v-spacer>
						</v-date-picker>
						<v-flex style="height: 100%; background: #fff;">
							<v-btn block flat @click="modal = false">OK</v-btn>
						</v-flex>
					</v-dialog>
					<v-text-field
						label="NIK"
						type="number"
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
						label="Alamat"
						v-model="profile.address"
					></v-text-field>
					<v-text-field
						label="Jumlah Uang Untuk Rekening Yang Akan Dibuat"
						type="number"
						v-model="profile.amount"
					></v-text-field>
					<v-btn color="primary" @click="sendProfileData ">Continue</v-btn>
        </v-stepper-content>
				<v-stepper-content step="4">
					<v-text-field
						label="Tenor"
						v-model="loanData.tenor"
					></v-text-field>
					<v-text-field
						label="Gaji Perbulan"
						v-model="loanData.earnings"
					></v-text-field>
					<v-btn color="primary" @click="initiateLoan">Continue</v-btn>
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
			profile: {
				profilePictureName: 'https://art.placefull.com/Content/Properties/shared/images/no-profile-image.png'
			},
			loanData: {},
			modal: false,
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

			this.seedData ()
		}
		this.$validator.localize("en", bahasa);
	},
	computed: {
		...mapState({
			currentHousePick: state => state.main.currentHousePick,
			currentProfile: state => state.main.currentProfile,
			currentAccount: state => state.main.currentAccount
		}),
		dateOfBirth () {
			const detachmentDate = this.profile.birthDate.split('-')
			const reorderDate = detachmentDate[2] + '-' + detachmentDate[1] + '-' + detachmentDate[0]
			return reorderDate
		}
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
				...this.profile,
				userId: this.currentAccount.id,
				birthDate: this.dateOfBirth
			})
			this.e1 = 4
		},
		async initiateLoan () {
			const { id: houseId, price } = this.currentHousePick
			const { tenor, earnings } = this.loanData
			const { userId } = this.currentAccount

			await this.$store.dispatch('sendLoanData', {
				priceInRupiah: price,
				goldWeight: price / 600000,
				earnings,
				tenor,
				houseId,
				userId
			})

			this.$router.push('/profile')
		},
		seedData () {
			this.profile = {
				name: 'Hepiska Franatagola',
				birthDate: '1992-10-10',
				phone: '08898982983',
				address: 'Hepiska Franatagola',
				motherName: 'Mrs. Franatagola',
			}
		}
	}
}
</script>
