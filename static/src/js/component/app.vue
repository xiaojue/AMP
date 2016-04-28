<template>
	<div>
		<router-view keep-alive></router-view>
	</div>
</template>

<script lang="babel">

import store from '../store/index.js';

export default {
	name: 'App',
	store: store,
	data() {
		return {

		}
	},
	methods: {
		getUserInfo: () => {

		}
	},
	created() {
		// 初次加载获取用户信息，如未登录跳转到 '/'，如登录跳转到 '/main/project'
		// console.log('app.vue');
	}
}

</script>