<template>
	<div>
		<router-view keep-alive></router-view>
	</div>
</template>

<script lang="babel">

import Head from './common/header.vue';

export default {
	name: 'App',
	data() {
		return {

		}
	},
	components: {
		'm-head': Head
	},
	methods: {
		getUserInfo: () => {

		}
	},
	created() {

	}
}

</script>