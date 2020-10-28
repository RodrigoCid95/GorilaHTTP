"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.Get = void 0;
function Get(path) {
    return function (target, propertyKey, descriptor) {
        if (!target.hasOwnProperty('routes')) {
            target['routes'] = [];
        }
        if (typeof path === 'string') {
            target['routes'].push({
                path: path,
                method: 'get',
                function: target[propertyKey].bind(target),
            });
        }
        else {
            var middlewares = [target[propertyKey].bind(target)];
            for (var _i = 0, _a = path.middlewares; _i < _a.length; _i++) {
                var middleware = _a[_i];
                if (!target.hasOwnProperty(middleware)) {
                    console.error("El middleware " + middleware + " no est\u00E1 declarado!");
                    process.exit();
                }
                else {
                    middlewares.push(target[middleware].bind(target));
                }
            }
            target['routes'].push({
                path: path.path,
                method: 'get',
                function: target[propertyKey].bind(target),
                middlewares: middlewares,
            });
        }
        return descriptor;
    };
}
exports.Get = Get;
;
function Post(path) {
    return function (target, propertyKey, descriptor) {
        if (!target.hasOwnProperty('routes')) {
            target['routes'] = [];
        }
        if (typeof path === 'string') {
            target['routes'].push({
                path: path,
                method: 'post',
                function: target[propertyKey].bind(target),
            });
        }
        else {
            var middlewares = [target[propertyKey].bind(target)];
            for (var _i = 0, _a = path.middlewares; _i < _a.length; _i++) {
                var middleware = _a[_i];
                if (!target.hasOwnProperty(middleware)) {
                    console.error("El middleware " + middleware + " no est\u00E1 declarado!");
                    process.exit();
                }
                else {
                    middlewares.push(target[middleware].bind(target));
                }
            }
            target['routes'].push({
                path: path.path,
                method: 'post',
                function: target[propertyKey].bind(target),
                middlewares: middlewares,
            });
        }
        return descriptor;
    };
}
exports.Post = Post;
;
//# sourceMappingURL=router.js.map