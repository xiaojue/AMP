/*
 * AMP 前端入口文件
 */

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
	saveScrollPosition: true
});


import Index from './component/page/index.vue';
import Main from './component/page/main.vue';
import Project from './component/page/project.vue';

router.map({
    '/': {
        component: Index
    },
    '/main': {
    	component: Main,
	    subRoutes: {
	        '/project': {
	        	name: 'project',
	            component: Project
	        },
	        // '/api': {
	        //     // component: Baz
	        // }
	    }
	}
});

router.redirect({
	'*': '/main/project'
})


import App from './component/app.vue';
router.start(App, '#app');
