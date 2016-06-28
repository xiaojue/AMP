<template>
	<m-main-con>
		<m-top>
			<p class="title">使用反馈</p>
		</m-top>
		<m-middle>
			<div class="detail">
				<div class="item">
					<div class="main_form default_char">
						<textarea placeholder="请留下宝贵的使用建议" id="feedback" v-model="feedback">{{feedback}}</textarea>
					</div>
				</div>
			</div>
		</m-middle>
		<m-bottom>
			<div class="btn_con">
				<a href="javascript:void(0)" class="btn btn_success" @click="send()">发送</a>
			</div>
		</m-bottom>
	</m-main-con>
</template>
<style>
.feedback_con {
	width: 100%;
	height: 100%;
	position: absolute;
}

#feedback {
	display: block;
	height: 300px;
}
</style>
<script>
import store from 'store';
import actions from 'actions';

// container component
import conMain from '../container/main.vue';
import conTop from '../container/top.vue';
import conMiddle from '../container/middle.vue';
import conBottom from '../container/bottom.vue';

import wangEditor from 'wangeditor';
wangEditor.config.printLog = false;

export default {
	name: 'Feedback',
	data() {
		return {
			feedback: ''
		};
	},
	components: {
		'm-main-con': conMain,
		'm-top': conTop,
		'm-middle': conMiddle,
		'm-bottom': conBottom
	},
	ready() {

	},
	methods: {
		send() {
			if (this.feedback === '') {
				actions.alert(store, {
					show: true,
					msg: '真的要为空发给我么？',
					type: 'warning'
				});
				return;
			}
			this.$http({
				url: '/feedback',
				method: 'post',
				data: {
					feedback: this.feedback
				}
			}).then((res) => {
				if (!res.data.iserror) {
					this.feedback = '';
					actions.alert(store, {
						show: true,
						msg: '发送成功！感谢您的反馈',
						type: 'success'
					});
				}
			});
		}
	}
};
</script>
