import { Schema } from 'mongoose';

export default {
	users: {
		name: String,
		email: String,
		password: String,
		department: String,
		role: String,
		bg: String,
		avatar: String
	},
	projects: {
		name: { type: String, required: true },
		desc: String,
		creator: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
		create_time: { type: Number, required: true, default: Date.now },
		members: [{ type: Schema.Types.ObjectId, required: true, ref: 'users' }],
		remark: String // 备注
	},
	urls: {
		name: { type: String, required: true },
		desc: String,
		creator: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
		create_time: { type: Number, required: true, default: Date.now },
		url: String,
		parent_project: { type: Schema.Types.ObjectId, required: true, ref: 'projects' },
		status: { type: Number, dafault: 0 }, // 0未完成 1完成
		method: String,
		request_params: Array, // 请求参数说明
		request_example: Array, // 请求示例
		response_params: Array, // 返回的参数说明
		response_example: { // 返回示例
			in_use: { type: Number, default: 0 },
			exapmle_array: { type: Array }
		},
		remark: String // 备注
	},
	feedback: {
		user: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
		feedback: String
	}
};
