/*
 * AMP 前端入口文件
 */

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
	saveScrollPosition: true
});


import Index from './component/main/index.vue';
import Project from './component/main/project.vue';

router.map({
    '/': {
        component: Index
    },
    '/foo': {
    	// component: Foo,
	    subRoutes: {
	        '/project': {
	            component: Project
	        },
	        '/api': {
	            // component: Baz
	        }
	    }
	}

});


import App from './component/app.vue';
router.start(App, '#app');
