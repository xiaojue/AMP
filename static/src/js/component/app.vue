<template>
	<div>
		<router-view keep-alive></router-view>
	</div>
</template>

<script>


import store from 'store';
import actions from 'actions';

import utils from 'utils';

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
		this.$http({
			url: '/api/login',
			type: 'get',
		}).then((res) => {
			var resData = res.data;
			if(resData.iserror && resData.code === 401){
				// 未登录，跳转到登录页面
				this.$route.router.go('/');
			}else{
				actions.setUserInfo(store, utils.formatUserInfo(resData.data));
				// 设置背景图片，功能未开
				// store.dispatch('SETBGURL', resData.data.bgUlr);
			}
		})
	}
}

</script>