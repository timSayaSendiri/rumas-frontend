import authUtil from "~/utils/auth"

const API_BASE_DOMAIN = 'https://udin.us/rumas-backend/api'
// const API_BASE_DOMAIN = 'http://localhost:4000/api'
const balikDate = (birthDate) => {
  const detachmentDate = birthDate.split('-')
  const reorderDate = detachmentDate[2] + '-' + detachmentDate[1] + '-' + detachmentDate[0]
  return reorderDate
}

const actions = {
  async getHouses ({ commit }, keyword) {
    const API_URL = API_BASE_DOMAIN + '/house-list'
    const { data: { payload: houseList } } = await this.$axios.get(API_URL + '?keyword=' + keyword)
    commit('getHouses', houseList)
  },
  nuxtServerInit({ dispatch }, { req }) {
    dispatch("initAuth", req);
  },
  initAuth({ commit }, req) {
    let token

    if (req) {
      if (!req.headers.cookie) {
        return;
      }

      const jwtCookie = req.headers.cookie
        .split(";")
        .find(c => c.trim().startsWith("jwt="))

      if (!jwtCookie) {
        return;
      }

      token = jwtCookie.split("=")[1]
    } else {
      token = localStorage.getItem("token")
    }

    commit("setToken", token)
  },
  login ({ commit }, authData) {
    this.$axios
      .$post("/auth/login", authData)
      .then(result => {
        console.log("the result : ", result)
        if (result.success) {
          commit("setToken", result.user.token)
          authUtil.setToken(result.user.token)
        } else {
          commit("setAlert", result.message)
        }
      })
      .catch(err => {
        console.log("the errors : ", err)
        commit("setAlert", err.message)
      });
    console.log("trying to login")
  },
  logout({ commit }) {
    commit("clearToken")
    if (process.client) {
      authUtil.unsetToken()
    }
  },
  async sendHouseData ({ commit }, houseData) {
    try {
      const postedHouse = await this.$axios.post(API_BASE_DOMAIN + '/houses', houseData) 
      commit('fillCurrentHousePick', postedHouse.data)
    } catch (err) {
      console.log(err)
    }
  },
  async sendAccountData ({ commit }, accountData) {
    try {
      const createdAccount = await this.$axios.post(API_BASE_DOMAIN + '/users/register', accountData) 
      commit('fillCurrentAccount', {
        ...createdAccount.data.userDetail,
        userId: createdAccount.data.userDetail.id
      })
    } catch (err) {
      console.log(err)
    }
  },
  async sendProfileData ({ commit, state }, profileData) {
    try {
      const createdBTNProfile = await this.$axios.get(API_BASE_DOMAIN + '/user-register', {
        params: {
          nik: profileData.nik,
          nama_ibu_kandung: profileData.motherName,
          tgl_lahir: profileData.birthDate,
          nama: profileData.name
        }
      })

      const createdBTNAccount = await this.$axios.get(API_BASE_DOMAIN + '/account-creation', {
        params: {
          nomor_cif: createdBTNProfile.data.payload.cif_number,
          amount: profileData.amount
        }
      })

      const iso = new Date(balikDate(profileData.birthDate))
      const createdProfile = await this.$axios.post(API_BASE_DOMAIN + '/profiles', {
        ...profileData,
        cifNumber: createdBTNProfile.data.payload.cif_number,
        birthDate: iso.toISOString()
      }) 

      const bankAccount = await this.$axios.post(API_BASE_DOMAIN + '/bankaccounts', {
        bankAccountNumber: createdBTNAccount.data.payload.nomor_rekening,
        amount: profileData.amount,
        blockChainAddress: createdBTNAccount.data.payload.nomor_rekening,
        userId: state.currentAccount.userId
      })

      commit('fillCurrentProfile', {
        ...createdProfile.data,
        profileId: createdProfile.data.id,
        nik: profileData.nik,
        birthDate: profileData.birthDate,
        motherName: profileData.motherName,
        cif_number: createdBTNProfile.data.payload.cif_number,
        accountAmount: profileData.amount,
        accountNumber: createdBTNAccount.data.payload.nomor_rekening,
        bankAccount: bankAccount.data
      })
    } catch (err) {
      console.log(err, 'allSendProfileData')
    }
  },
  async sendLoanData ({ state, commit }, loanData) {
    const {
      priceInRupiah,
      earnings,
      goldWeight,
      tenor,
      houseId,
      userId
    } = loanData

    const {
      currentAccount: {
        nik,
        email,
        motherName,
        cif_number,
        birthDate,
        accountNumber
      }
    } = state

    try {
      const loan = await this.$axios.post(API_BASE_DOMAIN + '/loans', {
        priceInRupiah,
        goldWeight,
        tenor,
        houseId,
        userId
      })

      const iso = new Date(balikDate(birthDate))
      const transaction = await this.$axios.get(API_BASE_DOMAIN + '/transactions', {
        type: 'loan',
        goldWeight,
        amountInRupiah: priceInRupiah,
        date: iso.toISOString(),
        poorOfLoan: priceInRupiah,
        poorOfMonth: tenor,
        toEthAddress: accountNumber,
        fromEthAddress: "7518265441944561",
        loanId: loan.id,
        userId
      })

      const creditSubmission = await this.$axios.get(API_BASE_DOMAIN + '/create-submission', {
        params: {
          nik,
          nama: name,
          tgl_lahir: birthDate,
          nama_ibu_kandung: motherName,
          pendapatan: earnings,
          email,
          nomor_hp: phone,
          nomor_cif: cif_number
        }
      })

    } catch (err) {
      console.log(err)
    }
  },
  async getProfileData ({ commit }, user_id) {
    try {
      const createdProfile = await this.$axios.get(`https://udin.us/rumas-backend/api/users/${user_id}/profiles`) 
      commit('setUserProfile', createdProfile.data )
    } catch (err) {
      console.log(err)
    }
  },
  async getUserTransaction ({ commit }, user_id) {
    try {
      const transactions = await this.$axios.get(`https://udin.us/rumas-backend/api/users/${user_id}/transactions`) 
      commit('fillUserTransaction', transactions.data )
    } catch (err) {
      console.log(err)
    }
  },
  async getUserLoan({commit, state}) {
    const loan = await this.$axios.get(`https://udin.us/rumas-backend/api/users/${state.currentAccount.userId}/loans`) 
    commit('fillUserLoan', loan.data[0] ) 
  }
}

export default actions