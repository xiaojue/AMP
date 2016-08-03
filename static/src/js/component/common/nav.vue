<template>
	<nav class="con text_shadow">
		<div class="user_info">
			<div class="avatar">
				<input type="file" accept="image/gif, image/jpeg, image/png, image/jpg" @change="changeAvatar($event)">
				<img :src="userInfo.avatar">
				<span>点击上传头像</span>
			</div>
			<div class="desc">
				<p>{{userInfo.name}}</p>
				<p>{{userInfo.role}}</p>
				<p>{{userInfo.email}}</p>
			</div>
		</div>
		<div class="item_con">
			<div class="item">
				<ul>
					<li v-link="{name: 'projectList', params: {type: 'mine'}}">
						<span class="iconfont">&#xe606;</span>
						<p>我的项目</p>
						<i class="iconfont">&#xe604;</i>
					</li>
					<!-- <li v-link="{name: 'apiList', params: {type: 'mine'}}">
						<span class="iconfont">&#xe605;</span>
						<p>我的API</p>
						<i class="iconfont">&#xe604;</i>
					</li> -->
				</ul>
			</div>
			<!-- <div class="item">
				<ul>
					<li v-link="{name: 'projectList', params: {type: 'coverme'}}">
						<span class="iconfont">&#xe606;</span>
						<p>我参与的项目</p>
						<i class="iconfont">&#xe604;</i>
					</li>
					<li v-link="{name: 'apiList', params: {type: 'coverme'}}">
						<span class="iconfont">&#xe605;</span>
						<p>我参与的API</p>
						<i class="iconfont">&#xe604;</i>
					</li>
				</ul>
			</div> -->
			<div class="item">
				<ul>
					<li v-link="{name: 'projectList', params: {type: 'all'}}">
						<span class="iconfont">&#xe611;</span>
						<p>全部项目</p>
						<i class="iconfont">&#xe604;</i>
					</li>
					<!-- <li v-link="{name: 'apiList', params: {type: 'all'}}">
						<span class="iconfont">&#xe605;</span>
						<p>全部API</p>
						<i class="iconfont">&#xe604;</i>
					</li> -->
				</ul>
			</div>
			<div class="item">
				<ul>
					<li v-link="{name: 'postMan'}">
						<span class="iconfont">&#xe60c;</span>
						<p>接口测试</p>
						<i class="iconfont">&#xe604;</i>
					</li>
				</ul>
			</div>
			<div class="item">
				<ul>
					<li v-link="{name: 'introduction'}">
						<span class="iconfont">&#xe610;</span>
						<p>使用说明</p>
						<i class="iconfont">&#xe604;</i>
					</li>
					<li v-link="{name: 'feedback'}">
						<span class="iconfont">&#xe60e;</span>
						<p>使用反馈</p>
						<i class="iconfont">&#xe604;</i>
					</li>
				</ul>
			</div>
			<div class="item">
				<ul>
					<li>
						<input type="file" accept="image/gif, image/jpeg, image/png, image/jpg" @change="changeBg($event)">
						<span class="iconfont">&#xe612;</span>
						<p>更换背景</p>
						<i class="iconfont">&#xe604;</i>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>
<style scoped>
.con {
	width: 250px;
	position: fixed;
	height: 100%;
	left: 1%;
	top: 59px;
	overflow: auto;
	padding-bottom: 80px;
	box-sizing: border-box;
}

.user_info {
	width: 100%;
	height: 230px;
	background-color: rgba(255, 255, 255, 0.2);
	background-image: url('../../../img/noisy.png');
	border-radius: 4px;
	padding-top: 15px;
	box-sizing: border-box;
	box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
}

.user_info .avatar {
	width: 96px;
	height: 96px;
	border-radius: 50%;
	margin: 0 auto;
	overflow: hidden;
	border: 3px solid rgba(255, 255, 255, 0.3);
	position: relative;
	cursor: pointer;
}

.user_info .avatar img {
	display: block;
	width: 100%;
}

.user_info .avatar span {
	display: block;
	position: absolute;
	bottom: -100%;
	background-color: rgba(0, 0, 0, 0.4);
	font-size: 12px;
	line-height: 28px;
	color: #fff;
	width: 100%;
	text-align: center;
	padding-bottom: 10px;
	transition: all ease 0.2s;
}

.user_info .avatar:hover span {
	bottom: 0;
}

.user_info .avatar input {
	display: block;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	position: absolute;
	opacity: 0;
	cursor: pointer;
	z-index: 99;
}

.user_info .desc {
	color: #fff;
	text-align: center;
	margin-top: 10px;
}

.user_info .desc p:nth-child(1) {
	font-size: 22px;
	line-height: 34px;
}

.user_info .desc p:nth-child(2) {
	font-size: 16px;
	line-height: 28px;
}

.user_info .desc p:nth-child(3) {
	font-size: 14px;
	line-height: 26px;
}

.item_con {
	width: 100%;
}

.item_con .item {
	width: 100%;
	background-color: rgba(0, 0, 0, 0.2);
	border-radius: 4px;
	margin-top: 20px;
	color: #fff;
	box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
	background-image: url('../../../img/noisy.png');
}

.item_con .item ul {}

.item_con .item ul li {
	padding: 10px 10px 10px 35px;
	font-size: 12px;
	box-sizing: border-box;
	line-height: 24px;
	cursor: pointer;
	border-bottom: 1px solid rgba(0, 0, 0, 0.3);
	transition: all ease 0.1s;
	-webkit-transition: all ease 0.1s;
	-moz-transition: all ease 0.1s;
	-ms-transition: all ease 0.1s;
	position: relative;
}

.item_con .item ul li i {
	position: absolute;
	font-size: 12px;
	right: 25px;
	top: 50%;
	margin-top: -12px;
}

.item_con .item ul li span {
	position: absolute;
	font-size: 16px;
	left: 12px;
}

.item_con .item ul li:hover {
	background-color: rgba(255, 255, 255, 0.1);
}

.item_con .item ul li:last-child {
	border-bottom: none;
}

.item_con .item ul li input {
	display: block;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	position: absolute;
	opacity: 0;
	cursor: pointer;
	z-index: 99;
}
</style>
<script>
/*global FormData:true*/
import store from 'store';
import actions from 'actions';

export default {
	name: 'Left',
	vuex: {
		getters: {
			userInfo: () => {
				return store.state.userInfo;
			}
		},
		actions: actions
	},
	methods: {
		changeAvatar(ev) {
			actions.loading(store, true);
			let formData = new FormData();
			formData.append('files', ev.target.files[0]);
			this.$http({
				url: '/upload/avatar',
				method: 'post',
				data: formData
			}).then((res) => {
				const resData = res.data;
				actions.setAvatar(store, resData.data.file);
				actions.alert(store, {
					show: 'true',
					msg: '头像修改成功',
					type: 'success'
				});
				actions.loading(store, false);
			});
		},
		changeBg(ev) {
			actions.loading(store, true);
			let formData = new FormData();
			formData.append('files', ev.target.files[0]);
			this.$http({
				url: '/upload/bg',
				method: 'post',
				data: formData
			}).then((res) => {
				const resData = res.data;
				actions.setBgUrl(store, resData.data.file);
				actions.alert(store, {
					show: 'true',
					msg: '背景修改成功',
					type: 'success'
				});
				actions.loading(store, false);
			});
		}
	}
};
</script>
