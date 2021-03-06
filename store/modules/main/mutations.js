const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  clearToken(state) {
    state.token = null;
  },
  setAlert(state, content) {
    state.alert.show = true;
    state.alert.content = content;
  },
  clearAlert(state) {
    state.alert.show = false;
    state.alert.content = "";
  },
  getHouses (state, houseList) {
    state.houseList = houseList
  },
  fillCurrentHousePick (state, house) {
    state.currentHousePick = house
  },
  fillCurrentAccount (state, account) {
    state.currentAccount = account
  },
  setUserProfile (state, user) {
    state.userProfile = user
  },
  fillCurrentProfile (state, profile) {
    state.currentAccount = {
      ...state.currentAccount,
      ...profile
    }
  },
  fillUserTransaction (state, userTransaction) {
    
    state.userTransactions = userTransaction
  },
  fillUserLoan (state, userLoans) {
    state.userLoans = userLoans
  }
}

export default mutations