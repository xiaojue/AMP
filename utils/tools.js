export const inArray = (ele, arr) => {
	if (!arr instanceof Array) {
		throw new Error('arguments is not Array');
	}
	for (let i = 0; i < arr.length; i++) {
		if (ele === arr[i]) {
			return true;
		}
	}
	return false;
};

export const unique = (array) => {
	let obj = {};
	let i = 0;
	let len = 0;
	if (Array.isArray(array) && array.length > 0) {
		len = array.length;
		for (i = 0; i < len; i += 1) {
			obj[array[i]] = array[i];
		}
		return Object.keys(obj);
	}
	return [];
};

export const mixin = (source, target) => {
	for (var i in target) {
		if (target.hasOwnProperty(i)) {
			source[i] = target[i];
		}
	}
	return source;
};
