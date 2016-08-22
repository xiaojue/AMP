<template>
	<m-main-con>
		<m-top>
			<p class="title">{{titleMap[type]}}</p>
			<div class="search">
				<input type="text" v-model="searchStr" @keyup.enter="search()" debounce="300" placeholder="请输入名称进行搜索"></input>
			</div>
			<a class="btn btn_success" href="javascript:void(0)" v-link="{name: 'projectEdit', params: {id: 'new'}}">新建项目</a>
		</m-top>
		<m-middle>
			<div class="item_con">
				<div class="item" v-for="item in projects">
					<h2>{{item.name}}</h2>
					<p>{{item.desc}}</p>
					<a class="email" :href="'mailto:' + item.creator.email" :title="item.creator.email">{{item.creator.name}}</a>
					<span>{{item.create_time | Date 'yyyy-MM-dd hh:mm:ss'}}</span>
					<div class="check_detail text_shadow">
						<a href="javascript:void(0)" v-link="{name: 'projectDetail', params: {id: item._id}}">项目详情</a>
						<a href="javascript:void(0)" @click="modifyProject(item)">修改项目</a>
						<a href="javascript:void(0)" v-link="{name: 'apiList', params: {type: item._id}}">接口列表</a>
					</div>
				</div>
			</div>
		</m-middle>
		<m-bottom>
			<m-pagination :pagination-conf="paginationConf"></m-pagination>
		</m-bottom>
	</m-main-con>
</template>
<style scoped>
.item_con .item>h2 {
	font-size: 18px;
	line-height: 20px;
	color: #fff;
}

.item_con .item>p {
	font-size: 14px;
	line-height: 16px;
	display: block;
	width: 90%;
	color: #eee;
	margin-top: 3px;
}

.item_con .item .email {
	font-size: 13px;
	color: #eee;
}

.item_con .item>span {
	display: block;
	font-size: 11px;
	color: #eee;
}

.item_con .item .check_detail {
	right: 0;
	height: 100%;
	top: 0;
	right: 20px;
	/*background-color: rgba(225,90,0,0.5);*/
	display: flex;
	justify-content: center;
	align-content: space-between;
	position: absolute;
}

.item_con .item .check_detail a {
	color: #fff;
	text-decoration: none;
	line-height: 28px;
	padding: 0 15px;
	display: inline-block;
	vertical-align: text-bottom;
	align-self: center;
	font-size: 16px;
	background-color: rgba(255, 255, 255, 0.2);
	border-radius: 4px;
	margin: 0 5px;
	transition: all ease 0.2s;
}

.item_con .item .check_detail a:hover {
	background-color: rgba(255, 255, 255, 0.4)
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

import Pagination from '../base/pagination.vue';

export default {
	name: 'ProjectList',
	data() {
		return {
			type: null,
			titleMap: {
				all: '全部项目',
				coverme: '我参与的项目',
				mine: '我的项目'
			},
			paginationConf: {
				currentPage: 1, // 当前页
				totalItems: 0, // 总条数
				itemsPerPage: 15, // 每页条数
				pagesLength: 5, // 显示几页( 1,2,3 / 1,2,3,4,5)
				onChange: function() {
					// 回调
				}
			},
			projects: [],
			searchStr: ''
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
		'm-bottom': conBottom,
		'm-pagination': Pagination
	},
	route: {
		data(transition) {
			this.type = transition.to.params.type;
			this.getProjectData();
		}
	},
	ready() {
		this.paginationConf.onChange = () => {
			this.getProjectData();
		};
	},
	methods: {
		getProjectData() {
			actions.loading(store, true);
			const queryParams = {};
			if (this.type === 'mine') {
				queryParams.members = this.userInfo._id;
			}
			queryParams.limit = this.paginationConf.itemsPerPage;
			queryParams.page = this.paginationConf.currentPage;
			this.$http({
				url: '/api/projects',
				method: 'get',
				data: queryParams
			}).then((res) => {
				if (this.isLogin) {
					const resData = res.data;
					this.projects = resData.data.result;
					this.paginationConf.totalItems = resData.data.total;
				}
				actions.loading(store, false);
			});
		},
		modifyProject(item) {
			if (utils.checkAuthority(item)) {
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
					id: item._id
				}
			});
		},
		search() {
			this.$http({
				url: '/search/projects',
				method: 'get',
				data: {
					query: this.searchStr,
					limit: this.paginationConf.itemsPerPage,
					page: 1,
					members: this.userInfo._id
				}
			}).then((res) => {
				if (this.isLogin) {
					const resData = res.data;
					this.projects = resData.data.result;
					this.paginationConf.currentPage = 1;
					this.paginationConf.totalItems = resData.data.total;
				}
			});
		}
	}
};
</script>
