const getters = {
  isLogedIn(state) {
    return state.token !== null ? true : false;
  },
  alert(state) {
    return state.alert;
  }
}

export default getters