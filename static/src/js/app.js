import Vue from 'vue';
// import Vuex from 'vue';
import Router from 'vue-router';

// Vue.use(Vuex);
Vue.use(Router);

const router = new Router();

import App from './component/app.vue';

const BLANK = Vue.extend({});

router.map({
    '/': {
        component: App
    }
});

router.redirect({
    '*': '/'
});

router.start(BLANK, '#app');