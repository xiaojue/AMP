<template>
	<m-main-con>
		<m-top>
			<p class="title">{{id === 'new' ? '新建项目' : '修改项目'}}</p>
		</m-top>
		<m-middle>
			<div class="detail">
				<div class="item">
					<p class="title"># 项目名称</p>
					<div class="main_form">
						<span class="iconfont required">&#xe600;</span>
						<input type="text" placeholder="请输入项目名称" v-model="projectDetail.name"></input>
					</div>
				</div>
				<div class="item">
					<p class="title"># 项目描述</p>
					<div class="main_form">
						<textarea maxlength="200" placeholder="请输入项目描述" v-model="projectDetail.desc">{{projectDetail.desc}}</textarea>
						<div class="char_num">{{projectDetail.desc | length}}/200</div>
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
						<input type="text" disabled="disabled" :value="projectDetail.create_time | Date 'yyyy-MM-dd hh:mm:ss'"></input>
					</div>
				</div>
				<div class="item">
					<p class="title"># 成员</p>
					<div class="main_form">
						<input type="text" placeholder="请输入邮箱或姓名进行查询" v-model="memberQuery" debounce="300"></input>
						<ul class="member_query_list">
							<li class="no_one" v-show="showNoOne">无</li>
							<li v-for="item in members" @click="addMember(item)">{{item.name}}</li>
						</ul>
						<div class="memer_list">
							<div class="member_item" v-for="item in projectDetail.members">
								<span>{{item.name}}</span>
								<a href="javascript:void(0)" class="iconfont close" @click="deleteMember($index, item.id)">&#xe609;</a>
							</div>
						</div>
					</div>
				</div>
				<div class="item">
					<p class="title"># 备注</p>
					<div class="main_form default_char">
						<textarea id="remark" placeholder="请输入接口备注" style="height: 300px;" v-model="projectDetail.remark">{{projectDetail.remark}}</textarea>
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
.member_query_list {
	position: absolute;
	width: 350px;
	box-sizing: border-box;
	background-color: #fff;
	border-radius: 4px;
	margin-top: 3px;
	z-index: 9999;
	max-height: 168px;
	overflow: auto;
}

.member_query_list::-webkit-scrollbar {
	width: 8px;
	background-color: rgba(0, 0, 0, 0);
}

.member_query_list li {
	font-size: 14px;
	line-height: 28px;
	color: #333;
	text-shadow: none;
	padding: 0 10px;
	cursor: pointer;
	transition: all ease 0.2s;
}

.member_query_list li.no_one:hover {
	background-color: #fff;
	color: #333;
	border-radius: 4px;
}

.member_query_list li:hover {
	background-color: rgba(82, 215, 105, 0.9);
	color: #fff;
	border-radius: 4px;
	cursor: pointer;
}

.memer_list {}

.memer_list .member_item {
	display: inline-block;
	vertical-align: middle;
	padding: 8px 15px;
	background-color: #fff;
	color: #333;
	border: 1px solid #d9d9d9;
	border-radius: 15px;
	font-size: 14px;
	line-height: 12px;
	text-shadow: none;
	position: relative;
	margin: 15px 5px 0;
}

.memer_list .member_item .iconfont.close {
	font-size: 14px;
	color: #111;
	text-decoration: none;
	font-weight: 600;
	transition: all ease 0.2s;
	text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.memer_list .member_item .iconfont.close:hover {
	color: #666;
}
</style>
<script>
import store from 'store';
import actions from 'actions';

import utils from 'utils';

// container component
import conMain from '../container/main.vue';
import conTop from '../container/top.vue';
import conMiddle from '../container/middle.vue';
import conBottom from '../container/bottom.vue';

import WangEditor from 'wangeditor';
WangEditor.config.printLog = false;

import $ from 'jquery';

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
	name: 'ProjectEdit',
	data() {
		return {
			id: null,
			projectDetail: {
				name: '',
				desc: '',
				creator: '',
				create_time: '',
				members: [],
				remark: ''
			},
			creator: '',
			memberQuery: '',
			members: [],
			canQuit: false,
			showNoOne: false,
			remarkEditor: ''
		};
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
	components: {
		'm-main-con': conMain,
		'm-top': conTop,
		'm-middle': conMiddle,
		'm-bottom': conBottom
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
	methods: {
		inputCheck() {
			// 错误检查
			if (this.projectDetail.name === '' || !this.projectDetail.name) {
				actions.alert(store, {
					show: true,
					msg: '输入信息有误，请检查',
					type: 'danger'
				});
				return true;
			}
		},
		save() {
			if (this.inputCheck()) {
				return;
			}

			if (this.id === 'new') {
				this.projectDetail.members.push(this.userInfo._id);
			}

			this.$http({
				url: '/api/projects' + (this.id === 'new' ? '' : '?_id=' + this.id),
				method: this.id === 'new' ? 'post' : 'put',
				data: this.projectDetail
			}).then((res) => {
				if (this.isLogin) {
					const resData = res.data;
					actions.alert(store, {
						show: true,
						type: 'success',
						msg: this.id === 'new' ? '新建成功' : '修改成功'
					});
					this.canQuit = true;
					this.id === 'new' ? this.$route.router.go('/main/project/detail/' + resData.data._id) : null;
				}
			});
		},
		cancel() {
			if (this.id === 'new') {
				this.$route.router.go('/main/project/list/mine');
			} else {
				this.$route.router.go('/main/project/detail/' + this.projectDetail._id);
			}
		},
		queryMember() {
			const _this = this;
			this.$http({
				url: '/user/info',
				method: 'get',
				data: {
					query: this.memberQuery
				}
			}).then((res) => {
				const resDate = res.data;
				_this.members = resDate.data;
				_this.showNoOne = false;
				if (_this.members.length === 0) {
					_this.showNoOne = true;
				}
			});
		},
		addMember(member) {
			for (let i = 0; i < this.projectDetail.members.length; i++) {
				const _curr = this.projectDetail.members[i];
				if (_curr._id === member._id) {
					actions.alert(store, {
						show: true,
						msg: '成员已存在',
						type: 'warning'
					});
					this.memberQuery = '';
					return;
				}
			}
			this.projectDetail.members.push(member);
			this.memberQuery = '';
		},
		deleteMember(index, id) {
			this.projectDetail.members.splice(index, 1);
		},
		createEditor() {
			const _this = this;
			try {
				this.remarkEditor.destroy();
			} catch (e) {};
			this.remarkEditor = new WangEditor(document.getElementById('remark'));
			this.remarkEditor.config.menus = menus;
			this.remarkEditor.onchange = function() {
				_this.projectDetail.remark = this.$txt.html();
			};
			this.remarkEditor.create();
			this.remarkEditor.$txt.html(this.projectDetail.remark);
		}
	},
	route: {
		data(transtion) {
			this.id = transtion.to.params.id;
			if (this.id !== 'new') {
				actions.loading(store, true);
				this.$http({
					url: '/api/projects',
					method: 'get',
					data: {
						_id: this.id
					}
				}).then((res) => {
					if (this.isLogin) {
						const resData = res.data;
						this.projectDetail = resData.data.result[0];
						this.creator = resData.data.result[0].creator;

						this.createEditor();
						$('div[contentEditable]').blur();

						actions.loading(store, false);
						if (utils.checkAuthority(this.projectDetail)) {
							actions.alert(store, {
								show: true,
								msg: '无权限',
								type: 'danger'
							});
							this.canQuit = true;
							this.$route.router.go('/main/project/list/mine');
						}
					}
				});
			} else if (this.id === 'new') {
				setTimeout(() => {
					this.createEditor();
				}, 100);
			}
		}
	},
	watch: {
		memberQuery: {
			handler(val) {
				if (val === '') {
					this.members = [];
					this.showNoOne = false;
				}
				if (val !== '') {
					this.queryMember();
				}
			}
		}
	}
};
</script>
