import Vue from 'vue'
import Vuex from 'vuex'

import pensionCalculator from './modules/pension-calculator'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    pensionCalculator
  }
})

export default store