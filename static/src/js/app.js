/*
 * AMP 前端入口文件
 */

import Vue from 'vue';

import Router from 'vue-router';
Vue.use(Router);

import VueAjax from 'vue-resource';
Vue.use(VueAjax);

const router = new Router({
	saveScrollPosition: true
});

import store from 'store';
import actions from 'actions';

// filter
import './filter/index.js';

import routeGenerator from './router.js';
routeGenerator(router);

// 拦截所有的ajax请求
Vue.http.interceptors.push({
	request: function(request) {
		return request;
	},
	response: function(response) {
		if (response.request.url.indexOf('/postman') !== -1) {
			return response;
		}
		const resData = response.data;
		// 统一权限认证
		if (resData.iserror && resData.code === 401) {
			// 未登录，跳转到登录页面
			this.$route.router.go('/');
			actions.checkLogin(store, false);
			actions.loading(store, false);
		} else {
			actions.checkLogin(store, true);
		}
		return response;
	}
});

import App from './component/app.vue';
router.start(App, '#app');
