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

import Index from './component/page/index.vue';
import Main from './component/page/main.vue';

import ProjectList from './component/page/projectList.vue';
import ProjectDetail from './component/page/projectDetail.vue';
import ProjectEdit from './component/page/projectEdit.vue';

import ApiList from './component/page/apiList.vue';
import ApiDetail from './component/page/apiDetail.vue';
import ApiEdit from './component/page/apiEdit.vue';

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
	        }
	    }
	}
});

router.redirect({
	'*': '/main/project/list/mine'
})

import App from './component/app.vue';
router.start(App, '#app');

export const debugApp = router.app;
