<template>
	<m-main-con>
		<m-top>
			<p class="title">API详情</p>
		</m-top>
		<m-middle>
			<div class="detail">
				<div class="item">
					<p class="title">1 接口名称</p>
					<span class="main_p">{{apiDetail.name}}</span>
				</div>
				<div class="item">
					<p class="title">2 接口描述</p>
					<span class="main_p">{{apiDetail.desc}}</span>
				</div>
				<div class="item">
					<p class="title">3 创建人</p>
					<span class="main_p">{{creator.name}}</span>
				</div>
				<div class="item">
					<p class="title">4 创建时间</p>
					<span class="main_p">{{apiDetail.create_time | Date 'yyyy-MM-dd hh:mm:ss'}}</span>
				</div>
				<div class="item">
					<p class="title">5 所属项目</p>
					<div class="member_con">
						<span class="main_p">{{project_id.name}}</span>
					</div>
				</div>
				<div class="item">
					<p class="title">6 URL</p>
					<div class="member_con">
						<span class="main_p">{{apiDetail.url}}</span>
					</div>
				</div>
				<div class="item">
					<p class="title">7 HTTP请求方式</p>
					<div class="member_con">
						<span class="main_p">{{apiMain.method}}</span>
					</div>
				</div>
				<div class="item">
					<p class="title">8 请求参数</p>
					<div class="member_con">
						<span class="main_p" v-for="item in apiMain.request_example">{{item.name}}</span>
					</div>
				</div>
				<div class="item">
					<p class="title">8 H请求参数</p>
					<div class="member_con">
						<span v-for="item in members">{{item.name}}</span>
					</div>
				</div>
			</div>
		</m-middle>
		<m-bottom>
			
		</m-bottom>
	</m-main-con>
</template>

<style>
	
</style>

<script  type="text/ecmascript-6">

// container component
import con_main from '../container/main.vue';
import con_top from '../container/top.vue';
import con_middle from '../container/middle.vue';
import con_bottom from '../container/bottom.vue';

import store from 'store';
import actions from 'actions';
import jsbeautifier from 'js-beautify';

export default {
	name: 'ApiDetail',
	data() {
		return {
			id: null,
			apiDetail: {},
			canQuit: false,
			creator: {},
			apiMain: {},
			project_id: {},
			editor: {}
		}
	},
	components: {
		'm-main-con': con_main,
		'm-top': con_top,
		'm-middle': con_middle,
		'm-bottom': con_bottom
	},
	vuex: {
		getters: {
			isLogin: () => {
				return store.state.isLogin;
			},
			userInfo: () => {
				return store.state.userInfo;
			}
		},
		actions: actions
	},
	route: {
		data(transtion) {
			this.id = transtion.to.params.id;
			if(this.id !== 'new'){
				actions.loading(store, true);
				this.$http({
					url: '/api/urls',
					method: 'get',
					data: {
						_id: this.id
					}
				}).then((res) => {
					if(this.isLogin){
						const resData = res.data;
						console.log(resData);
						this.apiDetail = resData.data.result[0];
						this.creator = resData.data.result[0].creator;
						this.apiMain = resData.data.result[0].main;
						this.project_id = resData.data.result[0].project_id;
						this.editor.setValue(jsbeautifier(JSON.stringify(res.data)));
						actions.loading(store, false);
						if(utils.checkAuthorityInApi(this.apiDetail)){
							actions.alert(store, {
								show: true,
								msg: '无权限',
								type: 'danger'
							})
							this.canQuit = true;
							this.$route.router.go('/main/api/list/' + this.apiDetail.project_id._id);
						}
					}
				})
			}
		}
	},
}
</script>