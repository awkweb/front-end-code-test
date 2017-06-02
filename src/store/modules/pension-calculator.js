import { SET_RETIREMENT_AGE } from '../constants'

const state = {
	retirementAge: 70
}

const actions = {
}

const mutations = {
	[SET_RETIREMENT_AGE] (state, retirementAge) {
		state.retirementAge = retirementAge
	}
}

const getters = {
  retirementAge: state => {
    return state.retirementAge
  }
}

export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters
}
