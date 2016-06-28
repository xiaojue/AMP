<template>
	<m-main-con>
		<m-top>
			<p class="title">{{id === 'new' ? '新建API' : '修改API'}}</p>
		</m-top>
		<m-middle>
			<div class="detail">
				<div class="item">
					<p class="title"># 接口名称</p>
					<div class="main_form">
						<span class="iconfont required">&#xe600;</span>
						<input type="text" placeholder="请输入接口名称" v-model="apiDetail.name"></input>
					</div>
				</div>
				<div class="item">
					<p class="title"># 接口描述</p>
					<div class="main_form">
						<textarea maxlength="200" placeholder="请输入接口描述" v-model="apiDetail.desc">{{apiDetail.desc}}</textarea>
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
						<input type="text" disabled="disabled" :value="parent_project.name"></input>
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
						<select v-model="apiDetail.method">
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
					<div class="main_form full_width" v-for="item in apiDetail.request_params" track-by="$index">
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
						<span class="iconfont del" @click="delParams($index, 'request_params')">&#xe607;</span>
					</div>
				</div>
				<div class="item">
					<p class="title"># 请求示例</p>
					<a href="javascript:void(0)" class="add_new btn btn_sm btn_success" @click="addNew('request_example')">新增一条</a>
					<div class="main_form full_width" v-for="item in apiDetail.request_example" track-by="$index">
						<textarea placeholder="请输入请求示例" v-model="item">{{item}}</textarea>
						<span class="iconfont del" @click="delParams($index, 'request_example')">&#xe607;</span>
					</div>
				</div>
				<div class="item">
					<p class="title"># 返回参数</p>
					<a href="javascript:void(0)" class="add_new btn btn_sm btn_success" @click="addNew('response_params')">新增一条</a>
					<div class="main_form full_width" v-for="item in apiDetail.response_params" track-by="$index">
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
						<span class="iconfont del" @click="delParams($index, 'response_params')">&#xe607;</span>
					</div>
				</div>
				<div class="item">
					<p class="title"># 返回示例<span style="font-size: 12px;font-weight: normal;">（选中示例即为模拟接口请求时返回的数据）</span></p>
					<a href="javascript:void(0)" class="add_new btn btn_sm btn_success" @click="addNew('response_example')">新增一条</a>
					<div class="main_form full_width" v-for="item in apiDetail.response_example.exapmle_array" track-by="$index">
						<input type="checkbox" :checked="apiDetail.response_example.in_use === $index" @click="changeInUse($index)">
						<textarea placeholder="请输入返回示例" v-model="item" @blur="formatResExample($index)">{{item}}</textarea>
						<span class="iconfont del" @click="delParams($index, 'response_example')">&#xe607;</span>
					</div>
				</div>
				<div class="item">
					<p class="title"># 备注</p>
					<div class="main_form default_char">
						<textarea id="remark" placeholder="请输入接口备注" style="height: 300px;" v-model="apiDetail.remark">{{apiDetail.remark}}</textarea>
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
.iconfont.del {
	cursor: pointer;
	font-size: 18px;
	margin-left: 5px;
	color: rgba(255, 81, 81, 0.3);
	font-weight: bold;
	text-shadow: none;
	transition: all ease 0.2s;
	top: 0;
	position: absolute;
	right: 5px;
}

.iconfont.del:hover {
	color: rgba(255, 81, 81, 0.8);
}

.detail .item .main_form textarea.full_width {
	width: 100%;
	max-width: 100%;
}

.add_new {
	display: inline-block;
	margin-bottom: 10px;
	margin-left: 20px;
}

.detail .item .main_form select {
	width: 300px;
}

.detail .item .main_form.full_width {
	display: flex;
}

.detail .item .main_form.full_width input {
	flex: 1;
	margin: 0 5px;
}

.detail .item .main_form.full_width input[type="checkbox"] {
	display: block;
	position: absolute;
	left: -20px;
	cursor: pointer;
	top: 50%;
	transform: translateY(-50%);
}

.detail .item .main_form.full_width input:first-child {
	margin-left: 0;
}

.detail .item .main_form.full_width select {
	flex: 1;
	margin: 0 5px;
}
</style>
<script>
import WangEditor from 'wangeditor';
WangEditor.config.printLog = false;

import $ from 'jquery';

import utils from 'utils';

// container component
import conMain from '../container/main.vue';
import conTop from '../container/top.vue';
import conMiddle from '../container/middle.vue';
import conBottom from '../container/bottom.vue';

import store from 'store';
import actions from 'actions';

import jsbeautifier from 'js-beautify';

import commentRegex from 'comment-regex';

// 富文本编辑器菜单
const menus = [
	'source',
	'|', // '|' 是菜单组的分割线
	'bold',
	'underline',
	'italic',
	'strikethrough',
	'eraser',
	'forecolor',
	'|',
	'quote',
	'fontfamily',
	'fontsize',
	'head',
	'alignleft',
	'aligncenter',
	'alignright',
	'|',
	'link',
	'unlink',
	'table',
	'|',
	'insertcode',
	'|',
	'undo',
	'redo'
];

export default {
	name: 'ApiEdit',
	data() {
		return {
			id: null,
			apiDetail: {
				name: '',
				desc: '',
				url: '',
				parent_project: {},
				status: 0,
				method: 'get',
				request_params: [],
				request_example: [],
				response_params: [],
				response_example: {
					in_use: 0,
					exapmle_array: []
				},
				remark: ''
			},
			canQuit: true,
			creator: {},
			parent_project: {},
			remarkEditor: null, // 富文本编辑器示例
			editNum: 0
		};
	},
	components: {
		'm-main-con': conMain,
		'm-top': conTop,
		'm-middle': conMiddle,
		'm-bottom': conBottom
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
			if (!this.canQuit) {
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
			} else {
				transition.next();
			}
		});
	},
	route: {
		data(transtion) {
			this.id = transtion.to.params.id;
			if (this.id !== 'new') {
				actions.loading(store, true);
				this.$http({
					url: '/api/urls',
					method: 'get',
					data: {
						_id: this.id
					}
				}).then((res) => {
					if (this.isLogin) {
						const resData = res.data;
						this.apiDetail = resData.data.result[0];
						this.creator = resData.data.result[0].creator;
						this.parent_project = resData.data.result[0].parent_project;
						actions.loading(store, false);

						this.createEditor();
						$('div[contentEditable]').blur();

						if (utils.checkAuthorityInApi(this.apiDetail)) {
							actions.alert(store, {
								show: true,
								msg: '无权限',
								type: 'danger'
							});
							this.canQuit = true;
							this.$route.router.go('/main/api/list/' + this.apiDetail.parent_project._id);
						}
					}
				});
			}

			// 新建接口需要获取所属项目的信息
			if (this.id === 'new') {
				actions.loading(store, true);
				this.$http({
					url: '/api/projects',
					method: 'get',
					data: {
						_id: transtion.to.query.projectId
					}
				}).then((res) => {
					if (this.isLogin) {
						const resData = res.data;
						this.parent_project = resData.data.result[0];
						this.creator = resData.data.result[0].creator;

						this.createEditor();

						// 权限检查
						if (utils.checkAuthority(this.parent_project)) {
							actions.alert(store, {
								show: true,
								msg: '无权限',
								type: 'danger'
							});
							this.canQuit = true;
							this.$route.router.go('/main/api/list/' + transtion.to.query.projectId);
						}
					}
					actions.loading(store, false);
				});
			}
		}
	},
	methods: {
		addNew(type) {
			if (type === 'response_example') {
				this.apiDetail[type]['exapmle_array'].push('');
				return;
			}
			const typeMap = {
				response_params: {},
				request_example: '',
				request_params: {}
			};
			this.apiDetail[type].push(typeMap[type]);
		},
		delParams(index, type) {
			if (type === 'response_example') {
				this.apiDetail[type]['exapmle_array'].splice(index, 1);
				return;
			}
			this.apiDetail[type].splice(index, 1);
		},
		changeInUse(index) {
			this.apiDetail.response_example.in_use = index;
		},
		save() {
			this.apiDetail.parent_project = this.parent_project;

			for (let i = 0; i < this.apiDetail['response_example']['exapmle_array'].length; i++) {
				const _curr = this.apiDetail['response_example']['exapmle_array'][i];
				if (_curr === '') {
					this.apiDetail['response_example']['in_use'] = 0;
					this.apiDetail['response_example']['exapmle_array'].splice(i, 1);
				}
			}
			for (let i = 0; i < this.apiDetail['response_params'].length; i++) {
				const _curr = this.apiDetail['response_params'][i];
				if (Object.keys(_curr).length === 0) {
					this.apiDetail['response_params'].splice(i, 1);
				}
			}
			for (let i = 0; i < this.apiDetail['request_example'].length; i++) {
				const _curr = this.apiDetail['request_example'][i];
				if (_curr === '') {
					this.apiDetail['request_example'].splice(i, 1);
				}
			}
			for (let i = 0; i < this.apiDetail['request_params'].length; i++) {
				const _curr = this.apiDetail['request_params'][i];
				if (Object.keys(_curr).length === 0) {
					this.apiDetail['request_params'].splice(i, 1);
				}
			}

			// 去除空格
			this.apiDetail.url.replace(/\s/g, '');

			this.$http({
				url: '/api/urls' + (this.id === 'new' ? '' : '?_id=' + this.id),
				method: this.id === 'new' ? 'post' : 'put',
				data: this.apiDetail
			}).then((res) => {
				if (this.isLogin) {
					actions.alert(store, {
						show: true,
						type: 'success',
						msg: this.id === 'new' ? '新建成功' : '修改成功'
					});
					this.canQuit = true;
					this.id === 'new' ? this.$route.router.go('/main/api/list/' + this.apiDetail.parent_project._id) : null;
				}
			});
		},
		cancel() {
			this.$route.router.go('/main/api/list/' + this.parent_project._id);
		},
		createEditor() {
			const _this = this;
			try {
				this.remarkEditor.destroy();
			} catch (e) {};

			this.remarkEditor = new WangEditor('remark');
			this.remarkEditor.config.menus = menus;
			this.remarkEditor.onchange = function() {
				_this.apiDetail.remark = this.$txt.html();
			};
			this.remarkEditor.create();
			this.remarkEditor.$txt.html(this.apiDetail.remark);
		},
		jsbeautifier: jsbeautifier,
		formatResExample(index) {
			try {
				JSON.parse(this.apiDetail.response_example.exapmle_array[index].replace(commentRegex(), ''));
			} catch (e) {
				actions.alert(store, {
					show: true,
					msg: '输入必须符合json格式',
					type: 'danger'
				});
				return;
			}
			this.apiDetail.response_example.exapmle_array.$set(index, this.jsbeautifier(this.apiDetail.response_example.exapmle_array[index]));
		}
	},
	watch: {
		apiDetail: {
			handler(val) {
				this.editNum += 1;
				if (this.editNum === 2) {
					this.canQuit = false;
				}
			},
			deep: true
		}
	}
};
</script>
