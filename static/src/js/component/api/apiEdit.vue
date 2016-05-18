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

				<div class="item" v-show="id !== 'new'">
					<p class="title"># 所属项目</p>
					<div class="main_form">
						<input type="text" disabled="disabled" :value="project_id.name"></input>
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
							<option value="get">GET</option>
							<option value="post">POST</option>
							<option value="put">PUT</option>
							<option value="delete">DELETE</option>
						</select>
					</div>
				</div>
				<div class="item">
					<p class="title"># 是否完成</p>
					<div class="main_form">
						<select v-model="apiDetail.status">
							<option value="0">未完成</option>
							<option value="1">完成</option>
						</select>
					</div>
				</div>
				<div class="item">
					<p class="title"># 请求参数</p>
					<a href="javascript:void(0)" class="add_new btn btn_sm btn_success" @click="addNew('request_params')">新增一条</a>
					<div class="main_form full_width" v-for="item in apiMain.request_params">
						<input type="text" placeholder="Key" v-model="item.key">
						<select v-model="item.type">
							<option>请选择类型</option>
							<option value="String">String</option>
							<option value="Number">Number</option>
							<option value="Boolean">Boolean</option>
							<option value="Object">Object</option>
							<option value="Array">Array</option>
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
					<a href="javascript:void(0)" class="add_new btn btn_sm btn_success" @click="addNew('request_example')">新增一条</a>
					<div class="main_form" v-for="item in apiMain.request_example">
						<textarea placeholder="输入请求示例（请严格遵守JSON格式）" v-model="item">{{item | json}}</textarea>
					</div>
				</div>
				<div class="item">
					<p class="title"># 返回参数</p>
					<a href="javascript:void(0)" class="add_new btn btn_sm btn_success" @click="addNew('response_params')">新增一条</a>
					<div class="main_form full_width" v-for="item in apiMain.response_params">
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
						<span class="iconfont del">&#xe607;</span>
					</div>
				</div>
				<div class="item">
					<p class="title"># 返回示例</p>
					<a href="javascript:void(0)" class="add_new btn btn_sm btn_success" @click="addNew('response_example')">新增一条</a>
					<div class="main_form" v-for="item in apiMain.response_example">
						<textarea placeholder="输入返回示例（请严格遵守JSON格式）" v-model="apiDetail.desc">{{item}}</textarea>
					</div>
				</div>
				<div class="item">
					<p class="title"># 备注</p>
					<div class="main_form">
						<textarea placeholder="请输入接口备注" v-model="apiMain.remark">{{apiMain.remark}}</textarea>
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

.detail .item .main_form select{
	width: 300px;
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

<script type="text/ecmascript-6">

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
			apiDetail: {
				name: '',
				desc: '',
				url: '',
				status: 0,
				main: {}
			},
			canQuit: false,
			creator: {},
			apiMain: {
				method: 'get',
				request_params: [],
				request_example: [],
				response_params: [],
				response_example: [],
				remark: ''
			},
			project_id: {},
			canQuit: false
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
	created() {
		const _this = this;
		this.$route.router.beforeEach((transition) => {
			if(!this.canQuit){
				transition.abort();
				actions.confirm(store, {
					show: true,
					msg: '是否放弃修改？',
					apply() {
						_this.canQuit = true;
						_this.$route.router.go(transition.to.path);
					}
				});
				return;
			}else{
				transition.next();
			}
		})
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
						this.project_id = resData.data.result[0].project_id;
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

			// 新建接口需要获取所属项目的信息
			if(this.id === 'new'){
				actions.loading(store, true);
				this.$http({
					url: '/api/projects',
					method: 'get',
					data: {
						_id: transtion.to.query.projectId
					}
				}).then((res) => {
					if(this.isLogin){
						const resData = res.data;
						this.project_id = resData.data.result[0];
						this.creator = resData.data.result[0].creator;
						// 权限检查
						if(utils.checkAuthority(this.project_id)){
							actions.alert(store, {
								show: true,
								msg: '无权限',
								type: 'danger'
							})
							this.canQuit = true;
							this.$route.router.go('/main/api/list/' + transtion.to.query.projectId);
						}
					}
					actions.loading(store, false);
				})
			}
		}
	},
	methods: {
		addNew(type) {
			this.apiMain[type].push({});
		},
		save() {
			this.apiDetail.main = this.apiMain;
			this.apiDetail.project_id = this.project_id;
			this.$http({
				url: '/api/urls' + (this.id === 'new' ? '' : '?_id=' + this.id),
				method: this.id === 'new' ? 'post' : 'put',
				data: this.apiDetail
			}).then((res) => {
				if(this.isLogin){
					const resData = res.data;
					actions.alert(store, {
						show: true,
						type: 'success',
						msg: this.id === 'new' ? '新建成功' : '修改成功'
					})
					this.canQuit = true;
					this.id === 'new' ? this.$route.router.go('/main/api/list/' + this.apiDetail.project_id._id) : null;
				}
			})
		},
		cancel() {
			this.$route.router.go('/main/api/list/' + this.apiDetail.project_id._id);
		},
	}
}	

</script>