// 格式化用户信息
export const formatUserInfo = (userInfo) => {
	const result = {};
	var name = userInfo.name;
	var _arr1 = name.split('-');
	result.userName = _arr1[0];
	result.role = _arr1[2];
	result.email = userInfo.email;
	result.avatar = userInfo.avatar ? userInfo.avatar : '/dist/img/user_avatar.png';
	return result;
}