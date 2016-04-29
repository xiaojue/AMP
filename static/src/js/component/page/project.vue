<template>
	<div class="main_con">
		<h1>{{$route.query | json}}</h1>		
	</div>
</template>

<style scoped>

h1{color: #fff;display: block;width: 100%;}

</style>

<script lang="babel">

export default {
	name: 'Project',
	data() {
		return {

		}
	},
	created() {
		
	},
	route: {
	    data: function (transition) {
	    	console.log(transition.to.params);
	    	console.log(transition.to.query);
	    }
	}
}

</script>