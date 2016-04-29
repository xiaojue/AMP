<template>
	<div>
		<router-view keep-alive></router-view>
	</div>
</template>

<script lang="babel">

import $ from 'jquery';

import store from '../store/index.js';

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
		}
	},
	methods: {
		getUserInfo: () => {

		}
	},
	created() {
		// 设置背景图片（可用户自定义）
		$('#app').css('background-image', 'url(' + this.bgImgUrl + ')')
		// 初次加载获取用户信息，如未登录跳转到 '/'，如登录跳转到 '/main/project'
		// console.log('app.vue');
	}
}

</script>