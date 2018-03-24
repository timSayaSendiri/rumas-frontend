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
    state.account = account
  },
  fillCurrentProfile (state, profile) {
    state.account = {
      ...state.account,
      ...profile
    }
  }
}

export default mutations