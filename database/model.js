/*
 * db models
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default {
    users: {
        name: String,
        email: String,
        department: String,
        role: String,
        bg: String,
        avatar: String
    },
    projects: {
        name: { type: String, required: true },
        desc: String,
        creator: { type: Schema.Types.ObjectId, required: true, ref: 'users'},
        create_time: { type: Number, required: true, default: Date.now},
        main: {
            members: [{ type: Schema.Types.ObjectId, required: true, ref: 'users'}]
        }
    },
    urls: {
        name: { type: String, required: true },
        desc: String,
        creator: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
        create_time: { type: Number, required: true, default: Date.now},
        url: String,
        project_id: { type: Schema.Types.ObjectId, required: true, ref: 'projects'},
        status: {type: Number, dafault: 0}, // 0未完成 1完成
        main: {
            method: String,
            request_params: Object, // 请求参数说明
            request_example: Object, // 请求示例
            // response_type: { type: String, required: true }, // json/xml/html etc.
            response_params: Object, // 返回的参数说明
            response_example: Object, // 返回示例
            remark: String // 备注
        }
    }
}
