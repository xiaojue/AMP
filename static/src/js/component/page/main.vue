<template>
	<div>
		<m-head></m-head>
		<m-left></m-left>
		<router-view></router-view>
		<m-loading></m-loading>
		<m-alert></m-alert>
		<m-confirm></m-confirm>
	</div>
</template>

<style scoped>
	
</style>

<script>


import Loading from '../base/loading.vue';
import Alert from '../base/alert.vue';
import Confirm from '../base/confirm.vue';

import Head from '../common/header.vue';
import Nav from '../common/nav.vue';


export default {
	name: 'Main',
	data() {
		return {

		}
	},
	components: {
		'm-loading': Loading,
		'm-alert': Alert,
		'm-confirm': Confirm,
		'm-head': Head,
		'm-left': Nav
	}
}

</script>