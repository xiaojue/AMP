<template>
	<header class="text_shadow">
		<div class="flag">
			<h2 v-link="{name: 'projectList', params: {type: 'all'}}">AMP</h2>
		</div>
		<div class="user">
			<a href="javascript:void(0)" class="btn btn_danger" @click="logout()">退出</a>
		</div>
	</header>
</template>
<style scoped>
header {
	width: 98%;
	height: 44px;
	position: fixed;
	top: 0;
	left: 50%;
	background-color: rgba(255, 255, 255, 0.3);
	transform: translateX(-50%);
	-webkit-transform: translateX(-50%);
	-moz-transform: translateX(-50%);
	-ms-transform: translateX(-50%);
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;
	color: #fff;
	position: relative;
	text-align: justify;
	font-size: 0;
	background-image: url('../../../img/noisy.png');
}

header:after {
	content: '';
	display: inline-block;
	width: 100%;
	height: 0;
	font-size: 0;
	line-height: 0;
}

header>div {
	display: inline-block;
	vertical-align: middle;
}

.flag {
	font-size: 28px;
	line-height: 44px;
	width: 250px;
	text-align: center;
}

.flag h2 {
	cursor: pointer;
}

.user {
	width: 300px;
	line-height: 44px;
	text-align: right;
	box-sizing: border-box;
	padding-right: 15px;
	font-size: 0;
}

.user a {
	display: inline-block;
	vertical-align: middle;
}
</style>
<script>
import store from 'store';
import actions from 'actions';

import utils from 'utils';

export default {
	name: 'Header',
	data: () => {
		return {

		};
	},
	vuex: {
		actions: actions
	},
	methods: {
		logout() {
			this.$http({
				url: '/user/logout',
				method: 'post'
			}).then((res) => {
				if (!res.data.iserror) {
					actions.checkLogin(store, false);
					utils.delCookie('userInfo');
					this.$route.router.go('/');
					actions.setUserInfo(store, {});
				}
			});
		}
	}
};
</script>
