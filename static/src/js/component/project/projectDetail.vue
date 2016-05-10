<template>
	<m-main-con>
		<m-top>
			<p class="title">项目详情</p>
		</m-top>
		<m-middle>
			<div class="item_con">
				<div class="item">
					<span>项目名称：</span>
					<p>{{projectDetail.name}}</p>
				</div>
			</div>
		</m-middle>
		<m-bottom>
			<div class="btn_con">
				<a href="javascript:void(0)" class="btn btn_success" v-link="{name: 'projectEdit', params: {id: projectDetail.id}}">修改</a>
				<a href="javascript:void(0)" class="btn btn_default" @click="deleteProject()">删除</a>
			</div>
		</m-bottom>
	</m-main-con>
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

// container component
import con_main from '../container/main.vue';
import con_top from '../container/top.vue';
import con_middle from '../container/middle.vue';
import con_bottom from '../container/bottom.vue';

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
	components: {
		'm-main-con': con_main,
		'm-top': con_top,
		'm-middle': con_middle,
		'm-bottom': con_bottom
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