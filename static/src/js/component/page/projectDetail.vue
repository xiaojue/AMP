<template>

<div class="main_con">
	<div class="conent_list text_shadow">
		<div class="top">
			<p class="title">项目详情</p>
			<!-- <a class="btn btn_success" href="javascript:void(0)">新建项目</a> -->
		</div>
		<div class="middle">
			<h1>detail</h1>
		</div>
		<div class="bottom">
			<div class="btn_con">
				<a href="javascript:void(0)" class="btn btn_success" v-link="{name: 'projectEdit', params: {id: '1111'}}">修改</a>
				<a href="javascript:void(0)" class="btn btn_default">删除</a>
			</div>
		</div>
	</div>
</div>



</template>

<style scoped>

.top a{
	position: absolute;
	right: 15px;
	top: 50%;
	margin-top: -19px;
}

	
</style>

<script lang="babel">


export default {
	name: 'ProjectDetail',
	data() {
		return {
			projectDetail: {
				id: '1111',
				name: 'AMP',
				desc: 'API管理平台',
				creator: 'wangchunpeng@gomeplus.com',
				creatTime: 1461908909241,
				member: ['luoye@gomeplus.com','wangchunpeng@gomeplus.com'],
				apiNum: 10
			}
		}
	},
	route: {
		data(transtion) {
			console.log(transtion.to.params.id);
			// 拿到id请求数据赋值projectDetail渲染界面
		}
	}
}

</script>