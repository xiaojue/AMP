/*
 * AMP 前端入口文件
 */

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
	saveScrollPosition: true
});

// filter
import './filter/index.js';

// directive
import './directive/tips.js';

import Index from './component/page/index.vue';
import Main from './component/page/main.vue';
import projectList from './component/page/projectList.vue';

router.map({
    '/': {
        component: Index
    },
    '/main': {
    	component: Main,
	    subRoutes: {
	        '/project/list/:type': {
	        	name: 'projectList',
	            component: projectList
	        },
	        // '/project/detail/:id': {
	        	// name: 'projectDetail',
	            // component: projectList
	        // },
	        // '/project/edit/:id': {
	        	// name: 'projectEdit',
	            // component: projectList
	        // },
	        // '/api/list/:type': {
	        	// name: 'apiList',
	        //     // component: Baz
	        // },
	        // '/api/detail/:id': {
	        	// name: 'apiDetail',
	        //     // component: Baz
	        // },
	        // '/api/edit/:id': {
	        	// name: 'apiEdit',
	        //     // component: Baz
	        // }
	    }
	}
});

router.redirect({
	'*': '/main/project/list/mine'
})


import App from './component/app.vue';
router.start(App, '#app');
