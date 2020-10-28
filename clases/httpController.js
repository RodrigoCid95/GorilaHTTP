"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPController = void 0;
var core_1 = require("@gorila/core");
var HTTPController = (function () {
    function HTTPController(express, useLogger, libraryManager) {
        var _this = this;
        this.express = express;
        this.useLogger = useLogger;
        this.libraryManager = libraryManager;
        if (this.routes) {
            this.routes.forEach(function (route) {
                if (route.middlewares) {
                    _this.express[route.method](route.path, route.middlewares);
                }
                else {
                    _this.express[route.method](route.path, route.function);
                }
            });
            delete this.routes;
        }
        if (this.models) {
            this.models.forEach(function (mod) {
                _this['__proto__'][mod.property] = new mod.class(_this.libraryManager);
            });
            delete this.models;
        }
    }
    HTTPController.prototype.log = function (content, useLogger) {
        core_1.Log(content, useLogger || this.useLogger);
    };
    return HTTPController;
}());
exports.HTTPController = HTTPController;
//# sourceMappingURL=httpController.js.map