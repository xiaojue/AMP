<template>
	<div class="main_con">
		<div class="conent_list">
			<h2 class="title text_shadow">{{titleMap[type]}}</h2>
			<div class="item_con">
				<div class="item" v-for="item in projects" @mouseenter="">
					<h2>{{item.name}}</h2>
					<p>{{item.desc}}</p>
					<a class="email" :href="'mailto:' + item.creator">{{item.creator}}</a>
					<span>{{item.creatTime | Date 'yyyy-MM-dd hh:mm:ss'}}</span>
					<!-- <div class="check_detail" v-link="{path: '/main/project/detail', params: {id: item._id}}"><div class="all_center" style="width: 100%;">查看API列表</div></div> -->
				</div>
				<span>加载更多...</span>
			</div>
		</div>
	</div>
</template>

<style scoped>

.conent_list{
	width: 100%;
	box-sizing: border-box;
	background-color: rgba(255,255,255,0.2);
	border-radius: 4px;
	color: #fff;
	position: relative;
	height: 100%;
	padding-bottom: 66px;
	overflow: auto;
	box-sizing: border-box;
}
.conent_list>h2{
	font-size: 22px;
	line-height: 55px;
	text-indent: 15px;
}

.item_con{
	width: 100%;
	background-color: rgba(0,0,0,0.3);
	position: relative;
}

.item_con>span{
	display: block;
	font-size: 12px;
	cursor: pointer;
	height: 55px;
	line-height: 55px;
	width: 120px;
	text-align: center;
	margin: 0 auto;
}

.item_con .item{
	background-color: #e7ebec;
	color: #333;
	position: relative;
	text-shadow: none!important;
	padding: 10px 20px;
	box-sizing: border-box;
}
.item_con .item:hover{
	background-color: #fff!important;
}
.item_con .item:nth-child(2n+1){
	background-color: #dee4e5;
}

.item_con .item h2{
	font-size: 16px;
	line-height: 24px;
	display: block;
	color: #333;
}
.item_con .item p{
	font-size: 14px;
	display: block;
	width: 90%;
	line-height: 16px;
	color: #888D9A;
	margin: 5px 0;
}
.item_con .item .email{
	font-size: 12px;
	line-height: 18px;
	color: #888D9A;
}
.item_con .item span{
	display: block;
}
.item_con .item .check_detail{
	position: absolute;
	right: 0;
	width: 20%;
	height: 100%;
	top: 0;
	background-color: rgba(225,90,0,0.7);
	text-align: center;
	cursor: pointer;
}

.item_con .item:first-child{
	margin-top: 0;
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
				},
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