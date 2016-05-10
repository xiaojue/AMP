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
				<a href="javascript:void(0)" class="btn btn_success" v-link="{name: 'projectEdit', params: {id: projectDetail.id}}">修改</a>
				<a href="javascript:void(0)" class="btn btn_default" @click="deleteProject()">删除</a>
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
			isLogin: () => {
				return store.state.isLogin;
			}
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
				if(this.isLogin){
					var resData = res.data;
					this.projectDetail = res.data.data[0];
					actions.loading(store, false);
				}
			})
		},
		deleteProject() {
			var _this = this;
			actions.confirm(store, {
				show: true,
				msg: '是否删除本项目？',
				apply() {
					_this.$http({
						url: '/api/collection?id=' + _this.projectDetail.id,
						method: 'delete'
					}).then((res) => {
						actions.alert(store, {
							show: true,
							msg: '删除成功',
							type: 'success'
						})
						_this.$route.router.go('/main/project/list/mine');
					})
				}
			});
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