/*
 * vuex store
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
	isIndex: false,
	userInfo: {

	}
}

const actions = require('./action/index.js');
const mutations = require('./mutation/index.js');

export default new Vuex.Store({
    state,
    mutations,
    actions,
    strict: true
})