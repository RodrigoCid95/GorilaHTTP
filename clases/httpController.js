"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPController = void 0;
var express = require("express");
var core_1 = require("@gorila/core");
var HTTPController = (function () {
    function HTTPController(useLogger, libraryManager) {
        var _this = this;
        this.useLogger = useLogger;
        this.libraryManager = libraryManager;
        this['router'] = express.Router();
        if (this.routes) {
            this.routes.forEach(function (route) {
                if (route.middlewares) {
                    _this['router'][route.method](route.path, route.middlewares);
                }
                else {
                    _this['router'][route.method](route.path, route.function);
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