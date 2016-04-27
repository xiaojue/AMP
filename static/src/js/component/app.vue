<template>
	<div>
		<m-head></m-head>
		<router-view keep-alive></router-view>
	</div>
</template>

<style type="text/css">
	
</style>

<script lang="babel">

import Header from './common/header.vue';

export default {
	name: 'App',
	data: () => {
		return {

		}
	},
	components: {
		'm-head': Header
	}
}

</script>