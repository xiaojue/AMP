/*
 * AMP 前端入口文件
 */

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
	history: true,
	saveScrollPosition: true
});


import Index from './component/main/index.vue';

router.map({
    '/': {
        component: Index
    }
});

import App from './component/app.vue';
router.start(App, '#app');
