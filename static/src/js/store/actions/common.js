
export const loading = (store, params) => {
	store.dispatch('LOADING', params);
}

export const alert = (store, params) => {
	store.dispatch('ALERT', params);
	setTimeout(() => {
	    store.dispatch('HIDEALERT');
	}, params.delay || 2500);
}

export const confirm = (store, params) => {
	store.dispatch('CONFIRM', params);
}
