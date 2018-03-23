import Vuex from "vuex";
import main from './modules/main'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      main
    }
  })
}

export default createStore
