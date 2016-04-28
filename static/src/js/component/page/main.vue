<template>
	<div>
		<m-head></m-head>
		<router-view keep-alive></router-view>	
	</div>
</template>

<style scoped>
	
</style>

<script lang="babel">


import Head from '../common/header.vue';

export default {
	name: 'Main',
	data() {
		return {

		}
	},
	components: {
		'm-head': Head
	}
}

</script>