<template>
	<m-main-con>
		<m-top>
			<p class="title">使用说明</p>
		</m-top>
		<m-middle>
			<div class="detail">
				<div class="item">
					<p class="title">＃ 功能说明</p>
					<span class="main_p">1、 根据项目成员进行权限控制，项目外的人只有查看而没有修改或删除权限</span>
					<br>
					<span class="main_p">2、 提供 `mock server` 服务，详情见下 `Mock Sever` 部分</span>
					<br>
					<span class="main_p">3、 提供简易版 `postman` 测试真实接口功能</span>
					<br>
					<span class="main_p">4、 提供 `http` 和 `https` 两种协议，http: 9090，https: 8989</span>
					<br>
				</div>
				<div class="item">
					<p class="title">＃ Mock Server</p>
					<span class="main_p">在接口未完成时，本平台可以提供数据的 `mock` 服务。在新建接口时，定义好接口地址，接口参数，接口返回示例（可定义多个，勾选的示例即返回示例），根据本平台 `mock server` 的规则，请求接口，即可获取模拟数据。示例如下：</span>
					<br>
					<span class="main_p">第一步、新建项目</span>
					<br>
					<span class="main_p">第二步、进入接口列表页</span>
					<br>
					<span class="main_p">第三步、可见到如下提示</span>
					<br>
					<br>
					<img src="../../../img/doc1.png">
					<br>
					<br>
					<span class="main_p">第四步、定义接口 `url` `request params` `response example` ... </span>
					<br>
					<span class="main_p">第五步、客户端直接请求 `mock 服务根目录 + api_url` ，以及定义好的请求方式和请求参数，即可返回模拟数据（根据所勾选示例）</span>
					<br>
					<br>
					<pre>
						<code>
$.ajax({
	url: 'http://10.69.205.26:9090/mock573e881c0a26da2c7e4023ab/http://10.69.205.26:9090/api/projects'
	type: 'get',
	data: {
		creator: '573e7b7d796923827d1ab00d',
		limit: 1,
		page: 2
	},
	success: function(res){
		// ...
	}
})
						</code>
					</pre>
				</div>
				<div class="item">
					<p class="title">＃ 项目托管地址</p>
					<span class="main_p"><a style="color: #fff;" href="https://github.com/gomeplusFED/AMP" target="_blank">https://github.com/gomeplusFED/AMP</a> &nbsp;&nbsp;&nbsp;&nbsp;点个赞可好？</span>
					<br>
				</div>
			</div>
		</m-middle>
		<m-bottom>
			<p>&nbsp;</p>
		</m-bottom>
	</m-main-con>
</template>
<script>
// container component
import conMain from '../container/main.vue';
import conTop from '../container/top.vue';
import conMiddle from '../container/middle.vue';
import conBottom from '../container/bottom.vue';

export default {
	name: 'Introduction',
	data() {
		return {

		};
	},
	components: {
		'm-main-con': conMain,
		'm-top': conTop,
		'm-middle': conMiddle,
		'm-bottom': conBottom
	}
};
</script>
