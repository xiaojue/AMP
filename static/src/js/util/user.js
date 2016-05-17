/* 
 * 项目修改删除的权限检查 
 * @params item Object 项目详情
 */

import store from 'store';

// 项目权限检测
export const checkAuthority = (item) => {
	if(store.state.userInfo._id === item.creator._id){
		return false;
	}
	for(let i = 0; i < item.main.members.length; i++ ){
		const _curr = item.main.members[i];
		if (_curr._id === store.state.userInfo._id){
			return false;
		}
	}
	return true;
}

// 接口权限检测
export const checkAuthorityInApi = (item) => {
	if(store.state.userInfo._id === item.creator._id){
		return false;
	}
	for(let i = 0; i < item.project_id.main.members.length; i++ ){
		const _curr = item.project_id.main.members[i];
		if (_curr === store.state.userInfo._id){
			return false;
		}
	}
	return true;
}

