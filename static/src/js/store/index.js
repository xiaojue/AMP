/*
 * vuex store
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
	bgImgUrl: '/dist/img/main_bg.png',
	loading: false,
	alertConfig: {
		show: false,
		msg: '提示信息',
		type: 'info', // info/warning/success/danger
		delay: 2500
	},
	confirmConfig: {
		show: false,
		title: '弹出对话框',
		msg: '提示信息',
		apply: 'func',
		cancle: 'func'
	},
	userInfo: {}
}

import actions from './actions/index.js';
import mutations from './mutations/index.js';

export default new Vuex.Store({
    state,
    mutations,
    actions,
    strict: true
})