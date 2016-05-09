<template>
	<div>
		<router-view keep-alive></router-view>
	</div>
</template>

<script>

import $ from 'jquery';

import store from '../store/index.js';
import actions from '../store/actions/index.js';


import utils from '../util/index.js';

export default {
	name: 'App',
	store: store,
	data() {
		return {

		}
	},
	vuex: {
		getters: {
			bgImgUrl: () => {
				return store.state.bgImgUrl;
			}
		},
		actions: actions
	},
	methods: {

	},
	created() {
		$.ajax({
			url: '/api/login',
			type: 'get',
			success: (res) => {
				if(res.iserror && res.code === 401){
					// 未登录，跳转到登录页面
					this.$route.router.go('/');
				}else{
					actions.setUserInfo(store, utils.formatUserInfo(res.data));
					// 设置背景图片，功能未开
					// store.dispatch('SETBGURL', res.data.bgUlr);
				}
			}
		})
	}
}

</script>