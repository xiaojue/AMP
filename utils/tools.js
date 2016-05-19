
export const inArray = (ele, arr) => {
    if (!arr instanceof Array) {
        throw "arguments is not Array";
    }
    for (let i = 0; i < arr.length; i++) {
        if (ele === arr[i]) {
            return true;
        }
    }
    return false;
}


export const mixin = (source, target) => {
    for (var i in target) {
        if (target.hasOwnProperty(i)) {
            source[i] = target[i];
        }
    }
    return source;
}