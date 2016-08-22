/*
 * vuex store
 */
import Vue from 'vue';

import Vuex from 'vuex';
Vue.use(Vuex);

import utils from 'utils';

const state = {
	loading: false,
	alertConfig: {
		show: false,
		msg: '',
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
	isLogin: utils.getCookie('userInfo') !== undefined,
	userInfo: utils.getCookie('userInfo') ? JSON.parse(new Buffer(utils.getCookie('userInfo'), 'base64').toString()) : '',
	ldap: utils.getCookie('ldap') === 'true'
};

import actions from 'actions';
import mutations from './mutations/index.js';

export default new Vuex.Store({
	state,
	mutations,
	actions,
	strict: true
});
