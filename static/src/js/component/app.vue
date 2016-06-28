<template>
	<div :style="{backgroundImage: 'url(' + bgImgUrl + ')'}">
		<router-view keep-alive></router-view>
		<m-loading></m-loading>
		<m-alert></m-alert>
		<m-confirm></m-confirm>
	</div>
</template>
<script>
import store from 'store';
import actions from 'actions';

import Loading from './base/loading.vue';
import Alert from './base/alert.vue';
import Confirm from './base/confirm.vue';

export default {
	name: 'App',
	store: store,
	data() {
		return {

		};
	},
	vuex: {
		getters: {
			bgImgUrl: () => {
				return store.state.userInfo.bg || '/dist/img/main_bg.png';
			}
		},
		actions: actions
	},
	components: {
		'm-loading': Loading,
		'm-alert': Alert,
		'm-confirm': Confirm
	}
};
</script>
