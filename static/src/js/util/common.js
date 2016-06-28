export const isInObj = (ele, obj) => {
	for (let item in obj) {
		if (ele === item) {
			return true;
		}
	}
	return false;
};
