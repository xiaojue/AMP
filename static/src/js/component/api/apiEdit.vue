<template>
	<m-main-con>
		<m-top>
			<p class="title">{{id === 'new' ? '新建API' : '修改API'}}</p>
		</m-top>
		<m-middle>
			<div class="detail" style="padding-bottom: 30px;">
				<div class="item">
					<p class="title"># 接口名称</p>
					<div class="main_form">
						<span class="iconfont required">&#xe600;</span>
						<input type="text" placeholder="请输入项目名称" v-model="apiDetail.name"></input>
					</div>
				</div>
				<div class="item">
					<p class="title"># 接口描述</p>
					<div class="main_form">
						<textarea maxlength="200" placeholder="请输入项目描述" v-model="apiDetail.desc">{{apiDetail.desc}}</textarea>
						<div class="char_num">{{apiDetail.desc | length}}/200</div>
					</div>
				</div>
				<div class="item" v-show="id !== 'new'">
					<p class="title"># 创建人</p>
					<div class="main_form">
						<input type="text" disabled="disabled" :value="creator.name"></input>
					</div>
				</div>
				<div class="item" v-show="id !== 'new'">
					<p class="title"># 创建时间</p>
					<div class="main_form">
						<input type="text" disabled="disabled" :value="apiDetail.create_time | Date 'yyyy-MM-dd hh:mm:ss'"></input>
					</div>
				</div>
				<div class="item">
					<p class="title"># URL</p>
					<div class="main_form">
						<span class="iconfont required">&#xe600;</span>
						<input type="text" placeholder="请输入接口地址" v-model="apiDetail.url"></input>
					</div>
				</div>
				<div class="item">
					<p class="title"># HTTP请求方式</p>
					<div class="main_form">
						<span class="iconfont required">&#xe600;</span>
						<select v-model="apiMain.method">
							<option value="null">请选择请求方式</option>
							<option value="get">GET</option>
							<option value="post">POST</option>
							<option value="put">PUT</option>
							<option value="delete">DELETE</option>
						</select>
					</div>
				</div>
				<div class="item">
					<p class="title"># 请求参数</p>
					<a href="javascript:void(0)" class="add_new btn btn_sm btn_success">新增一条</a>
					<div class="main_form full_width" v-for="item in apiMain.request_params">
						<input type="text" placeholder="Key" v-model="item.key">
						<select v-model="item.type">
							<option>请选择类型</option>
							<option value="String">String</option>
							<option value="Number">Number</option>
							<option value="Boolean">Boolean</option>
							<option value="Object">Object</option>
							<option value="Array">Array</option>
							<option value="Null">Null</option>
						</select>
						<input type="text" placeholder="备注" v-model="item.remark">
						<select v-model="item.required">
							<option value="0">非必须</option>
							<option value="1">必须</option>
						</select>
						<span class="iconfont del">&#xe607;</span>
					</div>
				</div>
				<div class="item">
					<p class="title"># 请求示例</p>
					<a href="javascript:void(0)" class="add_new btn btn_sm btn_success">新增一条</a>
					<div class="main_form">
						<textarea placeholder="输入请求示例（请严格遵守JSON格式）" v-model="apiDetail.desc">{{apiDetail.desc}}</textarea>
					</div>
				</div>
				<div class="item">
					<p class="title"># 返回参数</p>
					<a href="javascript:void(0)" class="add_new btn btn_sm btn_success">新增一条</a>
					<div class="main_form full_width">
						<input type="text" placeholder="Key">
						<input type="text" placeholder="Type">
						<input type="text" placeholder="备注">
						<span class="iconfont del">&#xe607;</span>
					</div>
				</div>
				<div class="item">
					<p class="title"># 返回示例</p>
					<a href="javascript:void(0)" class="add_new btn btn_sm btn_success">新增一条</a>
					<div class="main_form">
						<textarea placeholder="输入返回示例（请严格遵守JSON格式）" v-model="apiDetail.desc">{{apiDetail.desc}}</textarea>
					</div>
				</div>
				<div class="item">
					<p class="title"># 备注</p>
					<div class="main_form">
						<textarea placeholder="请输入接口备注" v-model="apiDetail.desc">{{apiDetail.desc}}</textarea>
					</div>
				</div>
			</div>
		</m-middle>
		<m-bottom>
			<div class="btn_con">
				<a href="javascript:void(0)" class="btn btn_success" @click="save()">保存</a>
				<a href="javascript:void(0)" class="btn btn_default" @click="cancel()">取消</a>
			</div>
		</m-bottom>
	</m-main-con>
</template>

<style scoped>
.iconfont.del{
	cursor: pointer;
	font-size: 18px;
	margin-left: 5px;
	color: #ddd;
	font-weight: bold;
	text-shadow: none;
	transition: all ease 0.2s;
}
.iconfont.del:hover{
	color: #fff;
}
.detail .item .main_form textarea.full_width{
	width: 100%;
	max-width: 100%;
}
	
.add_new{
	display: inline-block;
	margin-bottom: 10px;
	margin-left: 20px;
}
.detail .item .main_form.full_width{
	display: flex;
}
.detail .item .main_form.full_width input{
	flex: 1;
	margin: 0 5px;
}
.detail .item .main_form.full_width input:first-child{
	margin-left: 0;
}
.detail .item .main_form.full_width select{
	flex: 1;
	margin: 0 5px;
}
</style>

<script>

import utils from 'utils';

// container component
import con_main from '../container/main.vue';
import con_top from '../container/top.vue';
import con_middle from '../container/middle.vue';
import con_bottom from '../container/bottom.vue';

import store from 'store';
import actions from 'actions';

export default {
	name: 'ApiEdit',
	data() {
		return {
			id: null,
			apiDetail: {},
			canQuit: false,
			creator: {},
			apiMain: {}
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
						this.apiDetail = resData.data.result[0];
						this.creator = resData.data.result[0].creator;
						this.apiMain = resData.data.result[0].main;
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