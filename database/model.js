/*
 * db models
 */
export default {
    users: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        department: { type: String, required: true },
        role: { type: String, required: true },
        bg: { type: String, required: true },
        avatar: { type: String, required: true }
    },
    projects: {
        name: { type: String, required: true },
        desc: { type: String, required: true },
        creator: { type: String, required: true },
        creat_time: { type: Number, required: true },
        members: { type: Array, required: true },
        apis: { type: Array, required: true },
    },
    urls: {
        name: { type: String, required: true },
        desc: { type: String, required: true },
        creator: { type: String, required: true },
        creat_time: { type: Number, required: true },
        url: { type: String, required: true },
        method: { type: String, required: true },
        request_params: { type: Object, required: true }, // 请求参数说明
        request_example: { type: Object, required: true }, // 请求示例
        // response_type: { type: String, required: true }, // json/xml/html etc.
        response_params: { type: Object, required: true }, // 返回的参数说明
        response_example: { type: Object, required: true }, // 返回示例
        remark: { type: String, required: true }, // 备注
    }
}
