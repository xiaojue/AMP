export const LOADING = (state, showOrHide) => {
	state.loading = showOrHide;
};

export const ALERT = (state, params) => {
	state.alertConfig.show = params.show;
	state.alertConfig.msg = params.msg || '提示信息';
	state.alertConfig.type = params.type || 'info';  // info/warning/success/danger
	state.alertConfig.delay = params.delay || 2500;  // info/warning/success/danger
};

export const HIDEALERT = (state, params) => {
	state.alertConfig.show = false;
};

export const CONFIRM = (state, params) => {
	state.confirmConfig.show = params.show;
	state.confirmConfig.title = params.title || '弹窗';
	state.confirmConfig.msg = params.msg || '';
	state.confirmConfig.apply = params.apply || function() {};
	state.confirmConfig.cancle = params.cancle || function() {};
};

export const HIDECONFIRM = (state) => {
	state.confirmConfig.show = false;
};

// 设置自定义背景url
export const SETBGURL = (state, url) => {
	state.userInfo.bg = url;
};

export const SETAVATAR = (state, url) => {
	state.userInfo.avatar = url;
};

// 设置用户信息
export const SETUSERINFO = (state, userInfo) => {
	state.userInfo = userInfo;
};

export const CHECKLOGIN = (state, isLogin) => {
	state.isLogin = isLogin;
};
