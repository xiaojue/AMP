<template>
	<div>
		<m-head></m-head>
		<m-left></m-left>
		<router-view></router-view>
		<m-loading></m-loading>
	</div>
</template>

<style scoped>
	
</style>

<script lang="babel">


import Loading from '../base/loading.vue';


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
		'm-head': Head,
		'm-left': Nav
	}
}

</script>