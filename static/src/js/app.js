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

// filter
import './filter/index.js';

// directive
// import './directive/tips.js';

import Index from './component/main/index.vue';
import Main from './component/main/main.vue';

import ProjectList from './component/project/projectList.vue';
import ProjectDetail from './component/project/projectDetail.vue';
import ProjectEdit from './component/project/projectEdit.vue';

import ApiList from './component/api/apiList.vue';
import ApiDetail from './component/api/apiDetail.vue';
import ApiEdit from './component/api/apiEdit.vue';

import PostMan from './component/postman/main.vue';

router.map({
    '/': {
        component: Index
    },
    '/main': {
    	component: Main,
	    subRoutes: {
	        '/project/list/:type': {
	        	name: 'projectList',
	            component: ProjectList
	        },
	        '/project/detail/:id': {
	        	name: 'projectDetail',
	            component: ProjectDetail
	        },
	        '/project/edit/:id': {
	        	name: 'projectEdit',
	            component: ProjectEdit
	        },
	        '/api/list/:type': {
	        	name: 'apiList',
	            component: ApiList
	        },
	        '/api/detail/:id': {
	        	name: 'apiDetail',
	            component: ApiDetail
	        },
	        '/api/edit/:id': {
	        	name: 'apiEdit',
	            component: ApiEdit
	        },
	        '/postman': {
	        	name: 'postMan',
	        	component: PostMan
	        }
	    }
	}
});

router.redirect({
	'*': '/main/project/list/mine'
})

import store from 'store';
import actions from 'actions';
// 拦截所有的ajax请求
Vue.http.interceptors.push({
    request: function (request) {
        return request;
    },
    response: function (response) {
    	const resData = response.data;
    	// 统一权限认证
    	if(resData.iserror && resData.code === 401){
    		// 未登录，跳转到登录页面
    		this.$route.router.go('/');
    		actions.checkLogin(store, false);
    		actions.loading(store, false);
    	}else{
    		actions.checkLogin(store, true);
    	}
        return response;
    }
});

import App from './component/app.vue';
router.start(App, '#app');

export const debugApp = router.app;
