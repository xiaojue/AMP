<template>
<div class="main_con">
	<div class="conent_list text_shadow">
		<div class="top">
			<p class="title">项目详情</p>
		</div>
		<div class="middle">
			<div class="item_con">
				<div class="item">
					<span>项目名称：</span>
					<p>{{projectDetail.name}}</p>
				</div>
			</div>
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

<script>

import store from 'store';
import actions from 'actions';

export default {
	name: 'ProjectDetail',
	data() {
		return {
			projectDetail: {
				
			},
			test: {}
		}
	},
	vuex: {
		getters: {

		},
		actions: actions
	},
	methods: {
		getProjectDetail(id) {
			actions.loading(store, true);
			this.$http({
				url: '/api/collection',
				method: 'get',
				data: {
					id: id
				}
			}).then((res) => {
				this.projectDetail = res.data.data[0];
				actions.loading(store, false);
			})
		}
	},
	route: {
		data(transtion) {
			var id = transtion.to.params.id;
			this.getProjectDetail(id);
		}
	}
}

</script>