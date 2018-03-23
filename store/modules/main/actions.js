import authUtil from "~/utils/auth"

const actions = {
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
  }
}

export default actions