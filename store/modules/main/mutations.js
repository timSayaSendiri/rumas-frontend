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
  }
}

export default mutations