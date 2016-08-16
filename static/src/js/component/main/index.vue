<template>
	<section class="index">
		<div class="desc">
			<div class="all_center" style="top: 30%;">
				<h2>AMP - Api Manage Platform</h2>
				<p>高效的API管理平台</p>
			</div>
		</div>
		<div class="login">
			<h2>登录</h2>
			<ul class="tab" v-show="ldap">
				<li :class="{'active': loginStyle === 0}" @click="changeLoginStyle(0)">LDAP</li>
				<li :class="{'active': loginStyle === 1}" @click="changeLoginStyle(1)">NORMAL</li>
			</ul>
			<form v-form name="loginForm" @submit.prevent="login()" v-show="loginOrRegister === 0 || loginStyle === 0">
				<label>
					<i class="iconfont">&#xe603;</i>
					<input type="text" v-model="loginModel.email" v-form-ctrl required name="email" placeholder="请输入邮箱"></input>
					<div class="errors" v-if="loginForm.$submitted">
						<p v-if="loginForm.email.$error.required">邮箱不能为空</p>
					</div>
				</label>
				<label>
					<i class="iconfont">&#xe602;</i>
					<input type="password" v-model="loginModel.passowrd" v-form-ctrl required name="passowrd" placeholder="请输入密码"></input>
					<div class="errors" v-if="loginForm.$submitted">
						<p v-if="loginForm.passowrd.$error.required">密码不能为空</p>
					</div>
				</label>
				<div class="remember">
					<label>
						<input type="checkbox" v-model="loginModel.remember"></input>
						<span>保存密码</span>
					</label>
					<label style="float: right;" v-show="loginStyle === 1">
						<span @click="registerUi(1)">注册</span>
					</label>
				</div>
				<div class="errors">
					<p>{{extraErr}}</p>
				</div>
				<button class="submit" type="submit">登录</button>
			</form>
			<form v-form name="registerForm" @submit.prevent="register()" v-show="loginOrRegister === 1 && loginStyle === 1">
				<label>
					<i class="iconfont">&#xe603;</i>
					<input type="text" v-model="registerModel.email" v-form-ctrl required name="email" placeholder="请输入用户名"></input>
					<div class="errors" v-if="registerForm.$submitted">
						<p v-if="registerForm.email.$error.required">邮箱不能为空</p>
					</div>
				</label>
				<label>
					<i class="iconfont">&#xe602;</i>
					<input type="password" v-model="registerModel.password" v-form-ctrl required name="password" placeholder="请输入密码"></input>
					<div class="errors" v-if="registerForm.$submitted">
						<p v-if="registerForm.password.$error.required">密码不能为空</p>
					</div>
				</label>
				<label>
					<i class="iconfont">&#xe602;</i>
					<input type="password" v-model="registerModel.passwordAgain" v-form-ctrl required name="passwordAgain" placeholder="请再次输入密码"></input>
					<div class="errors" v-if="registerForm.$submitted">
						<p v-if="registerForm.passwordAgain.$error.required">密码不能为空</p>
						<p v-show="registerModel.password !== registerModel.passwordAgain">密码不一致</p>
					</div>
				</label>
				<div class="remember">
					<label>
						<input type="checkbox" v-model="loginModel.remember"></input>
						<span>保存密码</span>
					</label>
					<label style="float: right;">
						<span @click="registerUi(0)">登录</span>
					</label>
				</div>
				<div class="errors">
					<p>{{extraErr}}</p>
				</div>
				<button class="submit" type="submit">注册</button>
			</form>
		</div>
	</section>
</template>
<style scoped>
.index {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
}

.desc {
	position: fixed;
	top: 20%;
	left: 25%;
	width: 800px;
	height: 400px;
	margin-left: -250px;
	color: #fff;
	animation: fadeInLeftBig 0.7s ease 0s 1 both;
	-webkit-animation: fadeInLeftBig 0.7s ease 0s 1 both;
	-moz-animation: fadeInLeftBig 0.7s ease 0s 1 both;
	-ms-animation: fadeInLeftBig 0.7s ease 0s 1 both;
}

.desc h2 {
	font-size: 20px;
	text-align: center;
	line-height: 88px;
}

.desc p {
	font-size: 16px;
	line-height: 66px;
	text-align: center;
}

.login {
	width: 400px;
	border: 1px solid rgba(255, 255, 255, 0.9);
	border-radius: 6px;
	position: fixed;
	left: 75%;
	top: 20%;
	margin-left: -200px;
	padding: 20px;
	box-sizing: border-box;
	animation: fadeInRightBig 0.7s ease 0s 1 both;
	-webkit-animation: fadeInRightBig 0.7s ease 0s 1 both;
	-moz-animation: fadeInRightBig 0.7s ease 0s 1 both;
	-ms-animation: fadeInRightBig 0.7s ease 0s 1 both;
	background-color: rgba(255, 255, 255, 0.2);
}

.login ul.tab {
	font-size: 0;
	margin-top: 10px;
}

.login ul.tab li {
	display: inline-block;
	vertical-align: middle;
	font-size: 14px;
	line-height: 26px;
	color: #fff;
	padding: 0 5px;
	cursor: pointer;
}

.login ul.tab li.active {
	border-bottom: 2px solid #fff;
}

.login h2 {
	color: #fff;
	font-size: 24px;
	font-weight: normal;
	line-height: 38px;
}

.login form {
	width: 100%;
	display: block;
	margin-top: 10px;
}

.login form>label {
	width: 100%;
	display: block;
	border: 1px solid #fff;
	border-radius: 4px;
	height: 38px;
	margin-top: 25px;
	position: relative;
}

.login form label i {
	display: block;
	width: 26px;
	height: 26px;
	position: absolute;
	color: #fff;
	font-size: 26px;
	font-weight: 300;
	margin-top: 4px;
	line-height: 26px;
	padding: 0;
	left: 10px;
}

.login form>label input {
	display: block;
	width: 100%;
	height: 100%;
	border: none;
	padding: 0 10px;
	margin: 0;
	font-size: 14px;
	box-sizing: border-box;
	text-indent: 36px;
	background: rgba(0, 0, 0, 0);
	color: #fff;
}

.login form label input::-moz-placeholder {
	color: rgba(255, 255, 255, 0.8);
}

.login form label input::-webkit-input-placeholder {
	color: rgba(255, 255, 255, 0.8);
}

.login form label input:-ms-input-placeholder {
	color: rgba(255, 255, 255, 0.8);
}

.login form label input:-webkit-autofill {
	-webkit-text-fill-color: #fff !important;
	transition: background-color 5000s ease-in-out 0s;
}

.login form label:first-child {
	margin-top: 0px;
}

.remember {
	color: #fff;
	font-size: 12px;
	line-height: 32px;
	-webkit-text-size-adjust: none;
	-webkit-user-select: none;
	margin-top: 15px;
}

.remember>label {
	cursor: pointer;
}

.remember>label input {
	display: inline-block;
	vertical-align: middle;
	margin-right: 5px;
}

.errors {}

.errors p {
	font-size: 12px;
	color: #f50;
	line-height: 20px;
}

.submit {
	display: block;
	font-size: 14px;
	width: 80%;
	height: 38px;
	border: 1px solid rgba(255, 255, 255, 0.7);
	padding: 0;
	margin: 20px auto 0;
	line-height: 38px;
	color: #fff;
	background: rgba(0, 0, 0, 0);
	cursor: pointer;
	text-align: center;
	border-radius: 4px;
	clear: both;
	transition: all ease 0.2s;
	-webkit-transition: all ease 0.2s;
	-moz-transition: all ease 0.2s;
	-ms-transition: all ease 0.2s;
}

.submit:hover {
	background: rgba(0, 0, 0, 0.1);
}
</style>
<script>
import Vue from 'vue';

import * as vueForm from 'vue-form';
Vue.use(vueForm);

import store from 'store';
import actions from 'actions';

export default {
	name: 'Index',
	data() {
		return {
			loginModel: {
				remember: true
			},
			registerModel: {},
			loginForm: {},
			registerForm: {},
			extraErr: null,
			loginStyle: 0, // 0:ldap 1:normal
			loginOrRegister: 0 // 0:login 1:register
		};
	},
	vuex: {
		getters: {
			isLogin: () => {
				return store.state.isLogin;
			},
			alertConfig: () => {
				return store.state.alertConfig;
			},
			ldap: () => {
				return store.state.ldap;
			}
		},
		actions: actions
	},
	ready: function() {
		this.loginStyle = this.ldap ? 0 : 1;
		if (this.isLogin) {
			this.$route.router.go('/main/project/list/mine');
		}
	},
	methods: {
		login() {
			// 登录验证，获取用户基本信息
			this.$http({
				url: '/user/login',
				method: 'post',
				data: {
					email: this.loginModel.email,
					password: this.loginModel.passowrd,
					remember: this.loginModel.remember ? 1 : 0,
					type: this.loginStyle
				}
			}).then((res) => {
				const resData = res.data;
				if (resData.iserror && resData.code === 400) {
					this.extraErr = resData.msg;
				} else {
					actions.setUserInfo(store, resData.data);
					this.$route.router.go('/main/project/list/mine');
				}
			});
		},
		changeLoginStyle(type) {
			this.loginStyle = type;
			this.extraErr = '';
		},
		registerUi(type) {
			this.loginOrRegister = type;
			this.extraErr = '';
		},
		register() {
			if (this.registerModel.password !== this.registerModel.passwordAgain) return;
			this.$http({
				url: '/user/register',
				method: 'post',
				data: {
					email: this.registerModel.email,
					password: this.registerModel.password
				}
			}).then((res) => {
				const resData = res.data;
				if (resData.iserror && resData.code === 400) {
					this.extraErr = resData.msg;
				} else {
					actions.setUserInfo(store, resData.data);
					actions.alert(store, {
						show: 'true',
						msg: '注册成功，自动登录',
						type: 'success'
					});
					this.$route.router.go('/main/project/list/mine');
				}
			});
		}
	},
	route: {
		data(transition) {
			if (this.isLogin) {
				this.$route.router.go('/main/project/list/mine');
			} else {
				this.$route.router.go('/');
			}
		}
	}
};
</script>
