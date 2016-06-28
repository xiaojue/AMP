/*
 * 项目修改删除的权限检查
 * @params item Object 项目详情
 */

import store from 'store';

// 项目权限检测（传入项目详情）
export const checkAuthority = (item) => {
	if (store.state.userInfo._id === item.creator._id) {
		return false;
	}
	for (let i = 0; i < item.members.length; i++) {
		const _curr = item.members[i];
		if (_curr._id === store.state.userInfo._id) {
			return false;
		}
	}
	return true;
};

// 接口权限检测（传入接口详情）
export const checkAuthorityInApi = (item) => {
	if (store.state.userInfo._id === item.creator._id) {
		return false;
	}
	for (let i = 0; i < item.parent_project.members.length; i++) {
		const _curr = item.parent_project.members[i];
		if (_curr === store.state.userInfo._id) {
			return false;
		}
	}
	return true;
};
