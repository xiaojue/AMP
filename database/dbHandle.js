import mongoose from 'mongoose';

import models from './model.js';

const Schema = mongoose.Schema;

for (let item in models) {
	mongoose.model(item, new Schema(models[item]));
}

const _getModel = function(type) {
	return mongoose.model(type);
};

export const getModel = (type) => {
	return _getModel(type);
};
