<template>
<div class="main_con">
	<div class="conent_list text_shadow">
		<div class="top">
			<p class="title">修改项目</p>
			<!-- <a class="btn btn_success" href="javascript:void(0)">新建项目</a> -->
		</div>
		<div class="middle">
			<h1>{{id}}</h1>
		</div>
		<div class="bottom">
			<div class="btn_con">
				<a href="javascript:void(0)" class="btn btn_success">保存</a>
				<a href="javascript:void(0)" class="btn btn_default">取消</a>
			</div>
		</div>
	</div>
</div>	
</template>

<style>
	
</style>

<script>
	

export default {
	name: 'projectEdit',
	data() {
		return {
			id: null
		}
	},
	route: {
		data(transtion) {
			// console.log(transtion.to.params.id);
			this.id = transtion.to.params.id;
		}
	}
}

</script>