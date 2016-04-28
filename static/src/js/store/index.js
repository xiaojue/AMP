/*
 * vuex store
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
	loading: false,
	userInfo: {

	}
}

import * as actions from './actions/index.js';
import * as mutations from './mutations/index.js';

console.log(actions);

export default new Vuex.Store({
    state,
    mutations,
    actions,
    strict: true
})