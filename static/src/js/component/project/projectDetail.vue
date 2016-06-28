<template>
	<m-main-con>
		<m-top>
			<p class="title">项目详情</p>
		</m-top>
		<m-middle>
			<div class="detail">
				<div class="item">
					<p class="title">1 项目名称</p>
					<span class="main_p">{{projectDetail.name}}</span>
				</div>
				<div class="item">
					<p class="title">2 项目描述</p>
					<span class="main_p">{{projectDetail.desc}}</span>
				</div>
				<div class="item">
					<p class="title">3 创建人</p>
					<span class="main_p">{{creator.name}}</span>
				</div>
				<div class="item">
					<p class="title">4 创建时间</p>
					<span class="main_p">{{projectDetail.create_time | Date 'yyyy-MM-dd hh:mm:ss'}}</span>
				</div>
				<div class="item">
					<p class="title">5 项目成员</p>
					<div class="member_con">
						<span v-for="item in projectDetail.members">{{item.name}}</span>
					</div>
				</div>
				<div class="item">
					<p class="title">6 项目备注</p>
					<div class="wangEditor-container default_char" style="border-radius: 4px;background-color: rgba(255,255,255,0.9);">
						<div class="wangEditor-txt">{{{projectDetail.remark || '无'}}}</div>
					</div>
				</div>
			</div>
		</m-middle>
		<m-bottom>
			<div class="btn_con">
				<a href="javascript:void(0)" class="btn btn_success" @click="modifyProject()">修改</a>
				<a href="javascript:void(0)" class="btn btn_default" @click="deleteProject()">删除</a>
			</div>
		</m-bottom>
	</m-main-con>
</template>
<style scoped>
.top a {
	position: absolute;
	right: 15px;
	top: 50%;
	margin-top: -19px;
}

.member_con {
	font-size: 0;
}

.member_con span {
	display: inline-block;
	vertical-align: middle;
	margin: 0 5px;
	padding: 8px 15px;
	background-color: #fff;
	color: #333;
	border: 1px solid #d9d9d9;
	border-radius: 15px;
	font-size: 14px;
	line-height: 12px;
	text-shadow: none;
}
</style>
<script>
import store from 'store';
import actions from 'actions';

// container component
import conMain from '../container/main.vue';
import conTop from '../container/top.vue';
import conMiddle from '../container/middle.vue';
import conBottom from '../container/bottom.vue';

import utils from 'utils';

export default {
	name: 'ProjectDetail',
	data() {
		return {
			projectDetail: {},
			creator: {}
		};
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
		'm-main-con': conMain,
		'm-top': conTop,
		'm-middle': conMiddle,
		'm-bottom': conBottom
	},
	route: {
		data(transtion) {
			const id = transtion.to.params.id;
			this.getProjectDetail(id);
		}
	},
	methods: {
		getProjectDetail(id) {
			actions.loading(store, true);
			this.$http({
				url: '/api/projects',
				method: 'get',
				data: {
					_id: id
				}
			}).then((res) => {
				if (this.isLogin) {
					const resData = res.data;
					this.projectDetail = resData.data.result[0];
					this.creator = resData.data.result[0].creator;
					actions.loading(store, false);
				}
			});
		},
		modifyProject() {
			if (utils.checkAuthority(this.projectDetail)) {
				actions.alert(store, {
					show: true,
					msg: '无权限',
					type: 'danger'
				});
				return;
			}
			this.$route.router.go({
				name: 'projectEdit',
				params: {
					id: this.projectDetail._id
				}
			});
		},
		deleteProject() {
			if (utils.checkAuthority(this.projectDetail)) {
				actions.alert(store, {
					show: true,
					msg: '无权限',
					type: 'danger'
				});
				return;
			}
			const _this = this;
			actions.confirm(store, {
				show: true,
				msg: '是否删除本项目？',
				apply() {
					_this.$http({
						url: '/api/projects?_id=' + _this.projectDetail._id,
						method: 'delete'
					}).then((res) => {
						actions.alert(store, {
							show: true,
							msg: '删除成功',
							type: 'success'
						});
						_this.$route.router.go('/main/project/list/mine');
					});
				}
			});
		}
	}
};
</script>
