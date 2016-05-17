<template>
	<m-main-con>
		<m-top>
			<p class="title">API详情</p>
		</m-top>
		<m-middle>
			
		</m-middle>
		<m-bottom>
			
		</m-bottom>
	</m-main-con>
</template>

<style>
	
</style>

<script>

// container component
import con_main from '../container/main.vue';
import con_top from '../container/top.vue';
import con_middle from '../container/middle.vue';
import con_bottom from '../container/bottom.vue';

export default {
	name: 'ApiDetail',
	data() {
		return {

		}
	},
	components: {
		'm-main-con': con_main,
		'm-top': con_top,
		'm-middle': con_middle,
		'm-bottom': con_bottom
	},
	route: {
		data(transition) {

		}
	}
}	

</script>