import {Store} from "koa-session2";

class CustomStore extends Store {
    constructor() {
        super();
        this.store = {};
    }

    async get(sid) {
        return this.store[sid];
    }

    async set(session, opts) {
        if(!opts.sid) {
            opts.sid = this.getID(24);
        }
        this.store[opts.sid] = session;
        return opts.sid;
    }

    async destory(sid) {
        delete this.store[sid];
    }
}

module.exports = CustomStore;