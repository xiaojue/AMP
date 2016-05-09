const utils = {};


utils.mixin = (source, target) => {
    for (var i in target) {
        if (target.hasOwnProperty(i)) {
            source[i] = target[i];
        }
    }
    return source;
}


import * as user from './user.js';
utils.mixin(utils, user);



export default utils;