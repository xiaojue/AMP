<template>
	<div>
		<router-view keep-alive></router-view>
		<m-loading></m-loading>
		<m-alert></m-alert>
		<m-confirm></m-confirm>
	</div>
</template>

<script>


import store from 'store';
import actions from 'actions';

import utils from 'utils';

import Loading from './base/loading.vue';
import Alert from './base/alert.vue';
import Confirm from './base/confirm.vue';

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
	components: {
		'm-loading': Loading,
		'm-alert': Alert,
		'm-confirm': Confirm
	},
	created() {
		this.$http({
			url: '/api/login',
			method: 'get',
		}).then((res) => {
			var resData = res.data;
			if(resData.iserror && resData.code === 401){
				// 未登录，跳转到登录页面
				this.$route.router.go('/');
			}else{
				actions.setUserInfo(store, utils.formatUserInfo(resData.data));
				this.$route.router.go('/main/project/list/mine');
				// 设置背景图片，功能未开
				// store.dispatch('SETBGURL', resData.data.bgUlr);
			}
		})
	}
}

</script>