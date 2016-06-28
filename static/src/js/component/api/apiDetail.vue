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
						<span class="main_p">{{parent_project.name}}</span>
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
						<span class="main_p">{{apiDetail.method | uppercase}}</span>
					</div>
				</div>
				<div class="item">
					<p class="title">8 是否完成</p>
					<div class="member_con">
						<span class="main_p" v-if="apiDetail.status === 0">未完成</span>
						<span class="main_p" v-else>已完成</span>
					</div>
				</div>
				<div class="item">
					<p class="title">9 请求参数</p>
					<table v-if="apiDetail.request_params | length">
						<thead>
							<tr>
								<th>参数名</th>
								<th>备注信息</th>
								<th>类型</th>
								<th>是否必须</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in apiDetail.request_params">
								<td>{{item.key}}</td>
								<td>{{item.remark}}</td>
								<td>{{item.type}}</td>
								<td>{{item.required === '1' ? '必须' : '非必须'}}</td>
							</tr>
						</tbody>
					</table>
					<div class="member_con" v-else>
						<span class="main_p">无</span>
					</div>
				</div>
				<div class="item">
					<p class="title">10 请求示例</p>
					<div v-if="apiDetail.request_example | length">
						<pre v-for="item in apiDetail.request_example"><code>{{jsbeautifier(item)}}</code></pre>
					</div>
					<div class="member_con" v-else>
						<span class="main_p">无</span>
					</div>
				</div>
				<div class="item">
					<p class="title">11 返回参数</p>
					<table v-if="apiDetail.response_params | length">
						<thead>
							<tr>
								<th>参数名</th>
								<th>备注信息</th>
								<th>类型</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in apiDetail.response_params">
								<td>{{item.key}}</td>
								<td>{{item.remark}}</td>
								<td>{{item.type}}</td>
							</tr>
						</tbody>
					</table>
					<div class="member_con" v-else>
						<span class="main_p">无</span>
					</div>
				</div>
				<div class="item">
					<p class="title">12 返回示例</p>
					<div v-if="response_example.exapmle_array | length">
						<pre v-for="item in response_example.exapmle_array">
							<em v-show="response_example.in_use === $index">当前已选模拟数据</em>
							<code>{{jsbeautifier(item)}}</code>
						</pre>
					</div>
					<div class="member_con" v-else>
						<span class="main_p">无</span>
					</div>
				</div>
				<div class="item">
					<p class="title">13 备注</p>
					<div class="wangEditor-container default_char" style="border-radius: 4px;background-color: rgba(255,255,255,0.9);">
						<div class="wangEditor-txt" v-if="apiDetail.remark">{{{apiDetail.remark}}}</div>
						<div class="wangEditor-txt" v-else>
							<p>无</p>
						</div>
					</div>
				</div>
			</div>
		</m-middle>
		<m-bottom>
			<div class="btn_con">
				<a href="javascript:void(0)" class="btn btn_success" @click="edit()">修改</a>
				<a href="javascript:history.go(-1)" class="btn btn_default">返回</a>
			</div>
		</m-bottom>
	</m-main-con>
</template>
<style scoped>
pre {
	margin-top: 10px;
	position: relative;
}

pre code {
	display: block;
}

pre em {
	position: absolute;
	display: block;
	line-height: 22px;
	font-size: 12px;
	color: rgba(82, 215, 105, 1);
	top: 0;
	left: 0;
	font-style: normal;
	font-weight: bold;
}

table {
	width: 100%;
	border: 1px solid #aaa;
}

table thead {
	background-color: #ddd;
	text-shadow: none;
	color: #333;
	font-size: 15px;
	line-height: 38px;
	text-align: center!important;
}

table tbody {
	background-color: #fff;
	text-shadow: none;
	color: #000;
	font-size: 12px;
	text-align: center!important;
	line-height: 32px;
}

table tbody td {
	border-top: 1px solid #aaa;
}
</style>
<script>
// container component
import conMain from '../container/main.vue';
import conTop from '../container/top.vue';
import conMiddle from '../container/middle.vue';
import conBottom from '../container/bottom.vue';

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
			parent_project: {},
			response_example: {
				exapmle_array: [],
				in_use: 0
			}
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
						this.response_example = resData.data.result[0].response_example;
						actions.loading(store, false);
					}
				});
			}
		}
	},
	methods: {
		edit() {
			this.$route.router.go('/main/api/edit/' + this.id);
		},
		jsbeautifier: jsbeautifier
	}
};
</script>
