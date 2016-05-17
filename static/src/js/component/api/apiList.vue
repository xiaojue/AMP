<template>
	<m-main-con>
		<m-top>
			<p class="title">api列表</p>
		</m-top>
		<m-middle>
			<div class="item_con">
				<div class="item">
					
				</div>
			</div>
		</m-middle>
		<m-bottom>
			<m-pagination :pagination-conf="paginationConf"></m-pagination>
		</m-bottom>
	</m-main-con>
</template>

<style>
	
</style>

<script>

import Pagination from '../base/pagination.vue';

import store from 'store';
import actions from 'actions';

// container component
import con_main from '../container/main.vue';
import con_top from '../container/top.vue';
import con_middle from '../container/middle.vue';
import con_bottom from '../container/bottom.vue';

export default {
	name: 'ApiList',
	data() {
		return {
			paginationConf: {
				currentPage: 1,     // 当前页
				totalItems: 0,     // 总条数
				itemsPerPage: 15,    // 每页条数
				pagesLength: 5,     // 显示几页( 1,2,3 / 1,2,3,4,5)
				onChange: function() {
					// 回调
				}
			}
		}
	},
	components: {
		'm-main-con': con_main,
		'm-top': con_top,
		'm-middle': con_middle,
		'm-bottom': con_bottom
	},
	route: {
		data(transition) {

		}
	},
	methods: {
		getApiListData(type) {

		}
	}
}	

</script>