<template>
	<div class="confirm transition" transition="fade" v-show="confirmConfig.show">
		<div class="msg">{{confirmConfig.msg}}</div>
		<div class="btn_con">
			<a href="javascript:void(0)" class="btn btn_success" @click="apply(),hide()">确认</a>
			<a href="javascript:void(0)" class="btn btn_default" @click="cancel(),hide()">取消</a>
		</div>
	</div>
</template>

<style scoped>
.confirm{
	width: 500px;
	background-color: rgba(0,0,0,0.6);
	position: fixed;
	left: 50%;
	top: 100px;
	border-radius: 4px;
	transform: translate(-50%,-50%);-webkit-transform: translate(-50%,-50%);z-index: 999999;box-shadow: 1px 1px 10px rgba(0,0,0,0.4);

}
.confirm .msg{
	color: #fff;
	line-height: 88px;
	font-size: 18px;
	height: 88px;
	text-align: center;
}
.confirm .btn_con{
	font-size: 0;
	text-align: right;
	box-sizing: border-box;
	border-top: 2px solid #fff;
	padding: 10px 15px;
}
.confirm .btn_con a{
	display: inline-block;
	vertical-align: middle;
}
</style>

<script>
import store from 'store';
import actions from 'actions';

export default {
	name: 'Confirm',
	vuex: {
		getters: {
			confirmConfig() {
				return store.state.confirmConfig;
			}
		}
	},
	methods: {
		apply() {
			this.confirmConfig.apply && this.confirmConfig.apply();
		},
		cancel() {
			this.confirmConfig.cancle && this.confirmConfig.cancle();
		},
		hide() {
			actions.confirm(store, {
				show: false
			});
		}
	}
};
</script>