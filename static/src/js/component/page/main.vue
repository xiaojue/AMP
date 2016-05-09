<template>
	<div>
		<m-head></m-head>
		<m-left></m-left>
		<router-view></router-view>
		<m-loading></m-loading>
		<m-alert></m-alert>
	</div>
</template>

<style scoped>
	
</style>

<script>


import Loading from '../base/loading.vue';
import Alert from '../base/alert.vue';

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
		'm-head': Head,
		'm-left': Nav
	}
}

</script>