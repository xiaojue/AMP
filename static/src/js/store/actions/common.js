export const loading = (store, showOrHide) => {
	store.dispatch('LOADING', showOrHide);
};

export const alert = (store, params) => {
	store.dispatch('ALERT', params);
	setTimeout(() => {
		store.dispatch('HIDEALERT');
	}, params.delay || 2500);
};

export const confirm = (store, params) => {
	store.dispatch('CONFIRM', params);
};

export const setBgUrl = (store, url) => {
	store.dispatch('SETBGURL', url);
};

export const setAvatar = (store, url) => {
	store.dispatch('SETAVATAR', url);
};

export const setUserInfo = (store, userInfo) => {
	store.dispatch('SETUSERINFO', userInfo);
};

export const checkLogin = (store, isLogin) => {
	store.dispatch('CHECKLOGIN', isLogin);
};
