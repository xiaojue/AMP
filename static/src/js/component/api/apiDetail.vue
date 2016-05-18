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
					<p class="title">7 是否完成</p>
					<div class="member_con">
						<span class="main_p" v-if="apiDetail.status == 0">未完成</span>
						<span class="main_p" v-else>已完成</span>
					</div>
				</div>
				<div class="item">
					<p class="title">8 请求参数</p>
					<div class="member_con" v-for="item in apiMain.request_params">
						<span class="main_p" >
							<b>{{item.key}}</b>
							<b>{{item.remark}}</b>
							<b>{{item.type}}</b>
							<span v-if="item.required == 1">必须</span>
							<span v-else>非必须</span>
						</span>
					</div>
				</div>
				<div class="item">
					<p class="title">8 请求示例</p>
					<div class="member_con">
						<!--<span v-for="item in apiMain.request_example">{{item | json}}</span>-->
						<textarea placeholder="请输入请求示例" v-for="item in apiMain.request_example" v-model="item">{{item | json}}</textarea>
					</div>
				</div>

				<div class="item">
					<p class="title">8 返回参数</p>
					<div class="member_con" v-for="item in apiMain.response_params">
						<span class="main_p" >
							<b>{{item.key}}</b>
							<b>{{item.remark}}</b>
							<b>{{item.type}}</b>
							<!--<span v-if="item.required == 1">必须</span>-->
							<!--<span v-else>非必须</span>-->
						</span>
					</div>
				</div>

				<div class="item">
					<p class="title">8 返回示例</p>
					<div class="member_con">
						<!--<span v-for="item in apiMain.response_example">{{item | json}}</span>-->
						<textarea placeholder="请输入返回示例" v-for="item in apiMain.response_example" v-model="item">{{item | json}}</textarea>
					</div>
				</div>
				<div class="item">
					<p class="title">8 备注</p>
					<div class="member_con">
						<span class="main_p">{{{apiMain.remark}}}</span>
					</div>
				</div>
			</div>
		</m-middle>
		<m-bottom>
			
		</m-bottom>
	</m-main-con>
</template>

<style scoped>
	.main_p b{
		display: inline-block;
		width: 150px;
	}
	.item .title{
		background: rgba(205,205,205,0.3);
		line-height: 60px;
		text-indent: 0.5rem;
	}
	.member_con textarea{
		width: 96%;
		max-width: 96%;
		margin: 20px 0 0 0 ;
		padding: 10px 2%;
		min-height: 100px;
		border-radius: 4px;
		border: none;
	}
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
import utils from 'utils';

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
//						this.editor.setValue(jsbeautifier(JSON.stringify(res.data)));
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