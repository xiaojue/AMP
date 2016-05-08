<template>
	<div class="alert" v-show="alertConfig.show">
		<div class="alert_img" :class="alertConfig.type"></div>
		<div class="alert_msg">{{alertConfig.msg}}</div>
		<div class="close">关闭</div>
	</div>
</template>

<style scoped>
.alert {padding:15px 40px;border: 1px solid transparent;border-radius: 4px;position: fixed;left: 50%;top: 100px;transform: translate(-50%,-50%);-webkit-transform: translate(-50%,-50%);z-index: 999999;box-shadow: 1px 1px 10px rgba(0,0,0,0.4)}
.alert .alert_msg {margin-top: 0;color: #fff;font-size: 18px;display: inline-block;vertical-align: middle;}
.alert .alert_img{display: inline-block;vertical-align: middle;width: 100px;height: 100px;}
.alert .alert_img.success {color: #3c763d;background-color: #dff0d8;border-color: #d6e9c6;}
.alert .alert_img.info {color: #31708f;background-color: #d9edf7;border-color: #bce8f1;}
.alert .alert_img.warning {color: #8a6d3b;background-color: #fcf8e3;border-color: #faebcc;}
.alert .alert_img.danger {color: #a94442;background-color: #f2dede;border-color: #ebccd1;}
</style>

<script>

import store from '../../store/index.js';

export default {
	name: 'Alert',
	vuex: {
		getters: {
			alertConfig() {
				return store.state.alertConfig;
			}
		}
	}
}


</script>