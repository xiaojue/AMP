export const setCookie = (name, value, minute) => {
	var date = new Date();
	minute = minute || 2;
	date.setTime(date.getTime() + (minute * 60 * 1000));
	var expires = 'expires=' + date.toUTCString();
	document.cookie = name + '=' + value + '; ' + expires;
};

export const getCookie = (name) => {
	var cookies = {};
	var cookiesArr = document.cookie.replace(/\s+/g, '').split(';');
	for (var i = 0; i < cookiesArr.length; i++) {
		var _arr = cookiesArr[i].split('=');
		cookies[_arr[0]] = _arr[1];
	}
	return cookies[name];
};

export const delCookie = (name) => {
	setCookie(name, '', -1);
};
