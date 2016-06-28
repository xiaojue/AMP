<template>
	<div>
		<m-head></m-head>
		<m-left></m-left>
		<router-view></router-view>
	</div>
</template>
<style scoped>
</style>
<script>
import Head from '../common/header.vue';
import Nav from '../common/nav.vue';

export default {
	name: 'Main',
	data() {
		return {

		};
	},
	components: {
		'm-head': Head,
		'm-left': Nav
	}
};
</script>
