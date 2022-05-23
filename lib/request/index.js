"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.Patch = exports.Put = exports.Post = exports.Get = exports.Head = void 0;
const method_1 = require("./method");
const defaultOptions = { ttl: 0, tags: {}, context: {}, headers: {} };
/**
 * Head request.
 */
class Head {
    constructor(path, params, options = defaultOptions) {
        this.path = path;
        this.params = params;
        this.options = options;
        this.method = method_1.Method.Head;
    }
}
exports.Head = Head;
/**
 * Get request.
 */
class Get extends Head {
    constructor() {
        super(...arguments);
        this.method = method_1.Method.Get;
    }
}
exports.Get = Get;
/**
 * Post request.
 */
class Post {
    constructor(path, body, options = defaultOptions) {
        this.path = path;
        this.body = body;
        this.options = options;
        this.method = method_1.Method.Post;
    }
}
exports.Post = Post;
/**
 * Put request.
 */
class Put extends Post {
    constructor() {
        super(...arguments);
        this.method = method_1.Method.Put;
    }
}
exports.Put = Put;
/**
 * Patch request.
 */
class Patch extends Post {
    constructor() {
        super(...arguments);
        this.method = method_1.Method.Patch;
    }
}
exports.Patch = Patch;
/**
 * Delete request.
 */
class Delete extends Post {
    constructor() {
        super(...arguments);
        this.method = method_1.Method.Delete;
    }
}
exports.Delete = Delete;
//# sourceMappingURL=index.js.map