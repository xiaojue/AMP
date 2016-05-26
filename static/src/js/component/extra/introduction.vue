<template>
	<m-main-con>
		<m-top>
			<p class="title">使用说明</p>
		</m-top>
		<m-middle>
			<div class="detail">
				<div class="item">
					<p class="title">＃ 功能说明</p>
					<span class="main_p">1、分项目管理接口</span><br>
					<span class="main_p">2、根据成员控制对项目及接口的修改删除权限</span><br>
					<span class="main_p">3、建立好的接口可根据一定规则返回模拟数据，详情见下 Mock 部分</span><br>
					<span class="main_p">4、提供类似 postman 的真实接口测试功能</span><br>
				</div>
				<div class="item">
					<p class="title">＃ Mock</p>
					<span class="main_p">第一步、新建项目，从 url 中记录下项目的 ID </span><br>
					<span class="main_p">第二步、新建接口，填上返回示例，勾选的返回项即模拟时返回的数据（返回示例只支持json对象）</span><br>
					<span class="main_p">第三步、请求接口 'http://10.69.205.26:9090/mock'+ 项目ID + '/' + 接口URL ，即可获取假数据，如 http://10.69.205.26:9090/mock/573e881c0a26da2c7e4023ab/http://10.69.205.26:9090/user/info?query=luoye</span><br>
				</div>
				<div class="item">
					<p class="title">＃ 项目托管地址</p>
					<span class="main_p"><a style="color: #fff;" href="https://github.com/gomeplusFED/AMP" target="_blank">https://github.com/gomeplusFED/AMP</a> &nbsp;&nbsp;&nbsp;&nbsp;点个赞可好？</span><br>
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
import con_main from '../container/main.vue';
import con_top from '../container/top.vue';
import con_middle from '../container/middle.vue';
import con_bottom from '../container/bottom.vue';

	
export default {
	name: 'Introduction',
	data() {
		return {
			
		}
	},
	components: {
		'm-main-con': con_main,
		'm-top': con_top,
		'm-middle': con_middle,
		'm-bottom': con_bottom
	}
}

</script>