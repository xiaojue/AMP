<template>
	<m-main-con>
		<m-top>
			<p class="title">{{titleMap[type] ? titleMap[type] : 'API列表'}}</p>
			<a class="btn btn_success" v-show="titleMap[type] === undefined" href="javascript:void(0)" v-link="{name: 'apiEdit', params: {id: 'new'}, query: {projectId: type}}">新建接口</a>
		</m-top>
		<m-middle>
			<ul class="status">
				<li><a href="javascript:void(0)" class="btn btn_info" @click="statusQuery(-1)">全部 <span> {{statusLen.all}} </span></a></li>
				<li><a href="javascript:void(0)" class="btn btn_success" @click="statusQuery(1)">已完成 <span> {{statusLen.complete}} </span></a></li>
				<li><a href="javascript:void(0)" class="btn btn_danger" @click="statusQuery(0)">未完成 <span> {{statusLen.continue}} </span></a></li>
			</ul>
			<div class="item_con">
				<div class="item" id="thead">
					<ul>
						<li>名称</li>
						<li>地址</li>
						<li>状态</li>
						<li>操作</li>
					</ul>
				</div>
				<div class="item" v-for="item in apis">
					<ul>
						<li>{{item.name}}</li>
						<li>{{item.url}}</li>
						<li>{{item.status === 0 ? '未完成' : '已完成'}}</li>
						<li>
							<a href="javascript:void(0)" class="btn btn_sm btn_info" v-link="{name: 'apiDetail', params: {id: item._id}}">文档</a>
							<a href="javascript:void(0)" class="btn btn_sm btn_success" @click="modifyApi(item)">修改</a>
							<a href="javascript:void(0)" class="btn btn_sm btn_default" @click="delApi(item)">删除</a>
							<!-- <a href="javascript:void(0)" class="btn btn_sm btn_danger" @click="exportApi(item)">导出</a> -->
						</li>
					</ul>
				</div>
			</div>
		</m-middle>
		<m-bottom>
			<m-pagination :pagination-conf="paginationConf"></m-pagination>
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

.status{
	font-size: 0;
	text-align: center;
	margin-top: 15px;
}
.status li{
	display: inline-block;
	vertical-align: middle;
	margin: 0 5px;
	font-size: 14px;
	border-radius: 4px;
	cursor: pointer;
	padding: 8px 10px;
}
.status li span{
	text-decoration: underline;
}
#thead{
	background-color: #ddd;
	text-shadow: none;
}
#thead li{
	color: #333;
	font-size: 14px;
	font-weight: bold;
}
.item_con{
	margin-top: 15px;
}
.item_con .item ul{
	display: flex;
	justify-content: space-between;
}
.item_con .item ul:nth-child(1){
	text-align: center!important;
}
.item_con .item ul li{
	font-size: 12px;
	align-items: center;
	line-height: 28px;
}
.item_con .item ul li:nth-child(1){
	flex-basis: 30%;
}
.item_con .item ul li:nth-child(2){
	flex-basis: 30%;
}
.item_con .item ul li:nth-child(3){
	flex-basis: 10%;
}
.item_con .item ul li:nth-child(4){
	flex-basis: 30%;
}
.item_con .item ul li a{
	display: inline-block;
	vertical-align: middle;
}

</style>

<script>

import store from 'store';
import actions from 'actions';

import Pagination from '../base/pagination.vue';

import utils from 'utils';

// container component
import con_main from '../container/main.vue';
import con_top from '../container/top.vue';
import con_middle from '../container/middle.vue';
import con_bottom from '../container/bottom.vue';

export default {
	name: 'ApiList',
	data() {
		return {
			type: null,
			titleMap: {
				all: '全部API',
				coverme: '我参与的API',
				mine: '我的API'
			},
			paginationConf: {
				currentPage: 1,     // 当前页
				totalItems: 0,     // 总条数
				itemsPerPage: 15,    // 每页条数
				pagesLength: 5,     // 显示几页( 1,2,3 / 1,2,3,4,5)
				onChange: function() {
					// 回调
				}
			},
			apis: [],
			statusQueryStr: -1, // -1全部 0未完成 1完成
			statusLen: {
				all: 0,
				complete: 0,
				continue: 0
			}
		}
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
		'm-main-con': con_main,
		'm-top': con_top,
		'm-middle': con_middle,
		'm-bottom': con_bottom,
		'm-pagination': Pagination
	},
	route: {
	    data(transition) {
	    	this.type = transition.to.params.type;
	    	this.getApiListData();
	    }
	},
	ready() {
		this.paginationConf.onChange = () => {
			this.getApiListData();
		}
	},
	methods: {
		getApiListData() {
			actions.loading(store, true);
			const queryParams = {};
			if(!utils.isInObj(this.type, this.titleMap)){
				queryParams.parent_project = this.type;
			}
			if(this.type === 'mine'){
				queryParams.creator = this.userInfo._id;
			}
			if(this.statusQueryStr !== -1){
				queryParams['status'] = this.statusQueryStr;
			}
			queryParams.limit = this.paginationConf.itemsPerPage;
			queryParams.page = this.paginationConf.currentPage;

			this.$http({
				url: '/api/urls',
				method: 'get',
				data: queryParams
			}).then((res) => {
				if(this.isLogin){
					const resData = res.data;
					this.apis = resData.data.result;

					if(queryParams.status === undefined){
						this.statusLen = {
							all: 0,
							complete: 0,
							continue: 0
						}
						this.statusLen.all = this.apis.length;
						for(let i = 0; i < this.apis.length; i++){
							const _curr = this.apis[i];
							if(_curr.status === 0){
								this.statusLen.continue += 1;
							}
							if(_curr.status === 1){
								this.statusLen.complete += 1;
							}
						}
					}

					this.paginationConf.totalItems = resData.data.total;
				}
				actions.loading(store, false);
			})
		},
		statusQuery(type) {
			this.statusQueryStr = type;
			this.getApiListData();
		},
		modifyApi(item) {
			if(utils.checkAuthorityInApi(item)){
				actions.alert(store, {
					show: true,
					msg: '无权限',
					type: 'danger'
				})
				return;
			}
			this.$route.router.go({
				name: 'apiEdit',
				params: {
					id: item._id
				}
			})
		},
		delApi(item) {
			if(utils.checkAuthorityInApi(item)){
				actions.alert(store, {
					show: true,
					msg: '无权限',
					type: 'danger'
				})
				return;
			}
			const _this = this;
			actions.confirm(store, {
				show: true,
				msg: '是否删除本接口？',
				apply() {
					_this.$http({
						url: '/api/urls?_id=' + item._id,
						method: 'delete'
					}).then((res) => {
						actions.alert(store, {
							show: true,
							msg: '删除成功',
							type: 'success'
						})
						_this.getApiListData();
					})
				}
			});
		}
	}
}	

</script>