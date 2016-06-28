<template>
	<m-main-con>
		<m-top>
			<p class="title">接口测试<span style="font-size:12px;">（真实接口测试，返回的数据为真实接口返回的数据）</span></p>
		</m-top>
		<m-middle>
			<div class="post_man">
				<div class="request request_url">
					<input type="text" placeholder="请输入URL" v-model="url"></input>
					<select v-model="type">
						<option value="get">GET</option>
						<option value="post">POST</option>
						<option value="put">PUT</option>
						<option value="delete">DELETE</option>
					</select>
				</div>
				<div class="request request_btn_group">
					<a href="javascript:void(0)" class="btn btn_success" @click="addParams()">Add Params</a>
				</div>
				<div class="request request_params">
					<div class="item" v-for="item in params">
						<input type="text" placeholder="Key" v-model="item.key"></input>
						<input type="text" placeholder="Value" v-model="item.value"></input>
						<span class="iconfont" @click="deleteParams($index)">&#xe607;</span>
					</div>
				</div>
				<div class="request request_btn_group">
					<a href="javascript:void(0)" class="btn btn_success" @click="send()">{{status}}</a>
				</div>
				<div class="request request_result">
					<p>RESULT</p>
					<pre><code id="code"></code></pre>
				</div>
			</div>
		</m-middle>
		<m-bottom>
			<p>&nbsp;</p>
		</m-bottom>
	</m-main-con>
</template>
<style scoped>
.post_man {
	padding: 0 20px;
	box-sizing: border-box;
}

.post_man .request {
	margin: 20px 0;
}

.post_man .request_url {}

.post_man .request_url input {
	width: 400px;
}

.post_man .request_url select {
	width: 100px;
}

.post_man .request_params {}

.post_man .request_params .item {
	margin-top: 10px;
}

.post_man .request_params .item input {
	width: 250px;
}

.post_man .request_params .item span {
	cursor: pointer;
	font-size: 18px;
	margin-left: 5px;
	color: #ddd;
	font-weight: bold;
	text-shadow: none;
	transition: all ease 0.2s;
}

.post_man .request_params .item span:hover {
	color: #fff;
}

.post_man .request_btn_group {}

.post_man .request_btn_group a {
	display: inline-block;
	vertical-align: middle;
	margin-left: 0;
}

.post_man .request_result {}

.post_man .request_result p {
	border-bottom: 1px solid #fff;
}

.post_man .request_result pre {
	/*margin-top: 10px;*/
}
</style>
<script>
// container component
import conMain from '../container/main.vue';
import conTop from '../container/top.vue';
import conMiddle from '../container/middle.vue';
import conBottom from '../container/bottom.vue';

import CodeMirror from 'codemirror/lib/codemirror.js';
import 'codemirror/mode/javascript/javascript.js';

import jsbeautifier from 'js-beautify';

export default {
	name: 'PostMan',
	data() {
		return {
			url: '',
			type: 'get',
			params: [{
				key: '',
				value: ''
			}],
			jsonValue: '',
			editor: '',
			status: 'Send'
		};
	},
	components: {
		'm-main-con': conMain,
		'm-top': conTop,
		'm-middle': conMiddle,
		'm-bottom': conBottom
	},
	ready() {
		this.editor = CodeMirror(document.getElementById('code'), {
			value: '',
			lineNumbers: true,
			theme: 'eclipse',
			readOnly: 'nocursor',
			styleActiveLine: true,
			matchBrackets: true
		});
	},
	methods: {
		addParams() {
			this.params.push({
				key: '',
				value: ''
			});
		},
		deleteParams(index) {
			this.params.splice(index, 1);
		},
		send() {
			const resultParams = {};
			for (var item of this.params) {
				if (item.key !== '') {
					resultParams[item.key] = item.value;
				}
			}
			if (this.url === '') {
				return;
			}
			this.status = 'Fetching Data...';
			this.$http({
				url: '/postman',
				method: 'post',
				data: {
					url: this.url,
					type: this.type,
					params: resultParams
				}
			}).then((res) => {
				this.status = 'Send';
				this.editor.setValue(jsbeautifier(JSON.stringify(res.data)));
			});
		}
	}
};
</script>
