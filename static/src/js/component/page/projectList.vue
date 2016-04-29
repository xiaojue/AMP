<template>
	<div class="main_con">
		<div class="item_con">
			<h2 class="title">{{titleMap[type]}}</h2>
			<div class="project_item" v-for="item in projects" @mouseenter="">
				<h2>{{item.name}}</h2>
				<p>{{item.desc}}</p>
				<a class="email" :href="'mailto:' + item.creator">{{item.creator}}</a>
				<span>{{item.creatTime | Date 'yyyy-MM-dd hh:mm:ss'}}</span>
				<div class="check_detail" v-link="{path: '/main/project/detail', params: {id: item._id}}"><div class="all_center" style="width: 100%;">查看API列表</div></div>
			</div>
		</div>
	</div>
</template>

<style scoped>

h1{color: #fff;display: block;width: 100%;}

.project_item{
	width: 100%;
	box-sizing: border-box;
	padding: 20px 35px;
	background-color: rgba(255,255,255,0.2);
	margin-top: 20px;
	border-radius: 4px;
	color: #fff;
	position: relative;
}

.project_item h2{
	font-size: 34px;
	line-height: 44px;
	display: block;
	width: 90%;
}
.project_item p{
	font-size: 14px;
	display: block;
	width: 90%;
	line-height: 24px;
	color: #ccc;
}
.project_item .email{
	font-size: 12px;
	line-height: 20px;
	color: #fff;
}
.project_item span{
	display: block;
}
.project_item .check_detail{
	position: absolute;
	right: 0;
	width: 20%;
	height: 100%;
	top: 0;
	background-color: rgba(225,90,0,0.7);
	text-align: center;
	cursor: pointer;
}

.project_item:first-child{
	margin-top: 0;
}

.coming_from_right{
	animation: right 0.8s ease 0s both;
}


</style>

<script lang="babel">

import $ from 'jquery';

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
			projects: [
				{
					_id: '123123123',
					name: 'DataPlatform',
					desc: '美信数据平台',
					creator: 'fuqiang-ds1@gomeplus.com',
					creatTime: 1461908775821,
					member: ['yanglei-ds1@gomeplus.com', 'luoye@gomeplus.com'],
					apiNum: 60,
					public: true
				},
				{
					_id: '456456456',
					name: 'AMP',
					desc: 'API管理平台',
					creator: 'wangchunpeng@gomeplus.com',
					creatTime: 1461908909241,
					member: ['luoye@gomeplus.com'],
					apiNum: 10,
					public: true
				}
			]
		}
	},
	methods: {

	},
	created() {

	},
	route: {
	    data(transition) {
	    	this.type = transition.to.params.type;
	    }
	}
}

</script>