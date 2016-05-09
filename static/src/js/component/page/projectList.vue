<template>
	<div class="main_con">
		<div class="conent_list text_shadow">
			<div class="top">
				<p class="title">{{titleMap[type]}}</p>
				<a class="btn btn_success" href="javascript:void(0)" v-link="{name: 'projectEdit', params: {id: 'new'}}">新建项目</a>
			</div>
			<div class="middle">
				<div class="item_con">
					<div class="item" v-for="item in projects" @mouseenter="toggleMenu($index)" @mouseleave="toggleMenu($index)">
						<h2>{{item.name}}</h2>
						<p>{{item.desc}}</p>
						<a class="email" :href="'mailto:' + item.creator">{{item.creator}}</a>
						<span>{{item.creatTime | Date 'yyyy-MM-dd hh:mm:ss'}}</span>
						<div class="check_detail text_shadow" v-show="showMenu[$index]" v-link="{path: '/main/project/detail', params: {id: item.id}}" :class="{in: showMenu[$index], out: !showMenu[$index]}">
							<a href="javascript:void(0)" v-link="{name: 'projectDetail', params: {id: item.id}}">项目详情</a>
							<a href="javascript:void(0)" v-link="{name: 'projectEdit', params: {id: item.id}}">修改项目</a>
							<a href="javascript:void(0)">接口列表</a>
						</div>
					</div>
				</div>
			</div>
			<div class="bottom">
				<m-pagination :pagination-conf="paginationConf"></m-pagination>
			</div>
		</div>
	</div>
</template>

<style scoped>

.top a{
	position: absolute;
	right: 15px;
	top: 50%;
	margin-top: -19px;
}

.item_con .item{
	background-color: rgba(67,58,60, 0.6);
	background-image: url('/dist/img/noisy.png');
	color: #fff;
	position: relative;
	padding: 20px 20px;
	box-sizing: border-box;
}
.item_con .item:hover{
	background-color: rgba(42,36,38,0.6);
}
.item_con .item:nth-child(2n+1){
	background-color: rgba(62,49,69,0.6);
}
.item_con .item:nth-child(2n+1):hover{
	background-color: rgba(42,36,38,0.6);
}

.item_con .item>h2{
	font-size: 18px;
	line-height: 20px;
	color: #fff;
}
.item_con .item>p{
	font-size: 14px;
	line-height: 16px;
	display: block;
	width: 90%;
	color: #eee;
	margin-top: 3px;
}
.item_con .item .email{
	font-size: 13px;
	color: #eee;
}
.item_con .item>span{
	display: block;
	font-size: 11px;
	color: #eee;
}
.item_con .item .check_detail{
	right: 0;
	width: 300px;
	height: 100%;
	top: 0;
	background-color: rgba(225,90,0,0.5);
	display: flex;
	justify-content: center;
	align-content: space-between;
	position: absolute;
}

.item_con .item .check_detail a{
	color: #fff;
	text-decoration: none;
	line-height: 28px;
	padding: 0 15px;
	display: inline-block;
	vertical-align: text-bottom;
	align-self: center;
	font-size: 16px;
	right: -100%;
}
.in{
	animation: in 0.3s ease both;
}
.out{
	animation: out 0.3s ease both;
}
@keyframes in {
	0%{right: -100%;}	
	100%{right: 0;}
}
@keyframes out {
	0%{right: 0%;}
	100%{right: -100%;}
}
</style>

<script>

import Vue from 'vue';
import $ from 'jquery';

import Pagination from '../base/pagination.vue';

import store from '../../store/index.js';
import actions from '../../store/actions/index.js';

export default {
	name: 'Project',
	data() {
		return {
			type: null,
			titleMap: {
				all: '全部项目',
				coverme: '我参与的项目',
				mine: '我的项目'
			},
			paginationConf: {
				currentPage: 1,     // 当前页
				totalItems: 30,     // 总条数
				itemsPerPage: 4,    // 每页条数
				pagesLength: 5,     // 显示几页( 1,2,3 / 1,2,3,4,5)
				onChange: function() {
					// 回调
				}
			},
			projects: [],
			showMenu: {}
		}
	},
	vuex: {
		getters: {

		},
		actions: actions
	},
	methods: {
		toggleMenu(index) {
			this.showMenu[index] = !this.showMenu[index];
		},
		getProjectData(type) {
			actions.loading(store, true);
			$.ajax({
				url: '/api/collection',
				type: 'get',
				data: {

				},
				success: (res) => {
					this.projects = res.data;
					this.projects.forEach((item, index) => {
						Vue.set(this.showMenu, index, false);
					});
					actions.loading(store, false);
				}
			})
		}
	},
	created() {
		
	},
	route: {
	    data(transition) {
	    	this.type = transition.to.params.type;
	    	this.getProjectData(this.type);
	    }
	},
	components: {
		'm-pagination': Pagination
	}
}

</script>