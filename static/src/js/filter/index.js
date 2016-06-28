import Vue from 'vue';

// 毫秒转标准日期
Vue.filter('Date', function(value, format) {
	return new Date(value).Format(format);
});

Date.prototype.Format = function(fmt) {
	const o = {
		'M+': this.getMonth() + 1, // 月份
		'd+': this.getDate(), // 日
		'h+': this.getHours(), // 小时
		'm+': this.getMinutes(), // 分
		's+': this.getSeconds(), // 秒
		'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
		'S': this.getMilliseconds() // 毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
	for (const k in o) {
		if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
	}
	return fmt;
};

Vue.filter('length', function(value) {
	if (value) {
		const _c = value;
		return _c.length;
	}
	return 0;
});

Vue.filter('uppercase', function(value) {
	if (value) {
		return value.toLocaleUpperCase();
	}
});
