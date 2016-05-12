<template>
	<m-main-con>
		<m-top>
			<p class="title">接口测试</p>
		</m-top>
		<m-middle>
			<div class="post_man">
				<div class="request request_url">
					<input type="text" placeholder="请输入URL"></input>						
					<select>
						<option value="GET">GET</option>
						<option value="POST">POST</option>
						<option value="PUT">PUT</option>
						<option value="DELETE">DELETE</option>
					</select>
				</div>
				<div class="request request_params">
					<div class="item">
						<input type="text" placeholder="Key"></input>
						<input type="text" placeholder="Value"></input>
						<span class="iconfont">&#xe607;</span>
					</div>
				</div>
				<div class="request request_btn_group">
					<a href="javascript:void(0)" class="btn btn_success">Send</a>
				</div>
				<div class="request request_result">
					<p>RESULT</p>
					<pre>
						<code class="json">
							{
							    "code": 200,
							    "data": [
							        {
							            "id": 4,
							            "name": "hahaui",
							            "descr": "",
							            "creater": "",
							            "ctime": null
							        },
							        {
							            "id": 5,
							            "name": "haha",
							            "descr": "",
							            "creater": "",
							            "ctime": null
							        }
							    ],
							    "iserror": 0,
							    "msg": ""
							}
						</code>
					</pre>
					
				</div>
			</div>
		</m-middle>
		<m-bottom>
			<p>&nbsp;</p>
		</m-bottom>
	</m-main-con>
</template>

<style scoped>

.post_man{
	padding: 0 20px;
	box-sizing: border-box;
}
.post_man .request{
	margin: 20px 0;
}
.post_man .request_url{

}
.post_man .request_url input{
	width: 400px;
}
.post_man .request_url select{
	width: 100px;
}
	
.post_man .request_params{

}
.post_man .request_params .item input{
	width: 250px;
}
.post_man .request_params .item span{
	cursor: pointer;
	font-size: 18px;
	margin-left: 5px;
	color: #ddd;
	font-weight: bold;
	text-shadow: none;
	transition: all ease 0.2s;
}
.post_man .request_params .item span:hover{
	color: #fff;
}
.post_man .request_btn_group{

}
.post_man .request_btn_group a{
	display: inline-block;
	vertical-align: middle;
	margin-left: 0;
}
.post_man .request_result{

}
.post_man .request_result p{
	border-bottom: 1px solid #fff;
}
</style>

<script>

// container component
import con_main from '../container/main.vue';
import con_top from '../container/top.vue';
import con_middle from '../container/middle.vue';
import con_bottom from '../container/bottom.vue';

// import Highlight from 'highlight';
// console.log(Highlight);
import * as hljs from "../../lib/highlight.min.js";
	
export default {
	name: 'PostMan',
	data() {
		return {
			json: {
			    "code": 200,
			    "data": [
			        {
			            "id": 4,
			            "name": "hahaui",
			            "descr": "",
			            "creater": "",
			            "ctime": null
			        },
			        {
			            "id": 5,
			            "name": "haha",
			            "descr": "",
			            "creater": "",
			            "ctime": null
			        }
			    ],
			    "iserror": 0,
			    "msg": ""
			},
			jsonHtml: null
		}
	},
	components: {
		'm-main-con': con_main,
		'm-top': con_top,
		'm-middle': con_middle,
		'm-bottom': con_bottom
	},
	created() {
		hljs.configure({
		  	tabReplace: '    ', 
		})
		hljs.initHighlighting();
		// this.jsonHtml = hljs.highlightAuto(this.json, 'json');
		// console.log(hljs.highlightAuto(JSON.stringify(this.json), 'json'));
		console.log(JSON.stringify(this.json));
	}
}

</script>