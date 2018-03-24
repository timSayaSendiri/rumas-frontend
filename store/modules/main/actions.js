import authUtil from "~/utils/auth"
function xdr(url, method, data, errback) {
  return new Promise((resolve, reject) => {
    var req;

    if(XMLHttpRequest) {
      req = new XMLHttpRequest();

      if('withCredentials' in req) {
        req.open(method, url, true);
        req.onerror = errback;
        req.onreadystatechange = function() {
          if (req.readyState === 4) {
            if (req.status >= 200 && req.status < 400) {
              // callback(req.responseText);
              resolve(req.responseText)
            } else {
              reject(new Error('Response returned with non-OK status'))
            }
          }
        };
        req.send(data);
      }
    } else if(XDomainRequest) {
      req = new XDomainRequest();
      req.open(method, url);
      req.onerror = errback;
      req.onload = function() {
          resolve(req.responseText);
      };
      req.send(data);
    } else {
        reject(new Error('CORS not supported'));
    }
  })
}

const actions = {
  async getHouses ({ commit }, keyword) {
    const houselist = await this.$axios.post('http://mortgtech-eval-prod.apigee.net/btn-mortgtech/house-list', { keyword })
    commit('getHouses', houselist)
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
      const postedHouse = await this.$axios.post('https://udin.us/rumas-backend/api/houses', houseData) 
      commit('fillCurrentHousePick', postedHouse.data)
    } catch (err) {
      console.log(err)
    }
  },
  async sendAccountData ({ commit }, accountData) {
    try {
      const createdAccount = await this.$axios.post('https://udin.us/rumas-backend/api/users/register', accountData) 
      commit('fillCurrentAccount', createdAccount.data.userDetail)
    } catch (err) {
      console.log(err)
    }
  },
  async sendProfileData ({ commit }, profileData) {
    try {
      const createdProfile = await this.$axios.post('https://udin.us/rumas-backend/api/profiles', profileData) 
      if (createdProfile) {
        commit('fillCurrentProfile', createdProfile.data)
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export default actions