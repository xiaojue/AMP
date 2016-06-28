<template>
	<div class="alert transition" transition="fade" v-show="alertConfig.show">
		<div class="alert_tip" :class="alertConfig.type">
			<span class="iconfont" v-show="alertConfig.type === 'success'">&#xe608;</span>
			<span class="iconfont" v-show="alertConfig.type === 'info'">&#xe60a;</span>
			<span class="iconfont" v-show="alertConfig.type === 'warning'">&#xe60b;</span>
			<span class="iconfont" v-show="alertConfig.type === 'danger'">&#xe607;</span>
		</div>
		<div class="alert_msg">{{alertConfig.msg}}</div>
	</div>
</template>

<style scoped>
.alert {padding:15px 35px;border: 1px solid transparent;border-radius: 4px;position: fixed;left: 50%;top: 100px;transform: translate(-50%,-50%);-webkit-transform: translate(-50%,-50%);z-index: 999999;box-shadow: 1px 1px 10px rgba(0,0,0,0.4);background-color: rgba(0,0,0,0.6);}
.alert .alert_msg {margin-top: 0;color: #fff;font-size: 16px;display: inline-block;vertical-align: middle;}
.alert .alert_tip{display: inline-block;vertical-align: middle;font-size: 34px;line-height: 34px;margin-right: 10px;}
.alert .alert_tip.success {color: #52d368;}
.alert .alert_tip.info {color: #1c7df8;}
.alert .alert_tip.warning {color: #ffd769;}
.alert .alert_tip.danger {color: #ef5858;}
</style>

<script>
import store from 'store';

export default {
	name: 'Alert',
	vuex: {
		getters: {
			alertConfig() {
				return store.state.alertConfig;
			}
		}
	}
};
</script>