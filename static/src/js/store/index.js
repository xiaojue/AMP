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

import actions from './actions/index.js';
import mutations from './mutations/index.js';

export default new Vuex.Store({
    state,
    mutations,
    actions,
    strict: true
})